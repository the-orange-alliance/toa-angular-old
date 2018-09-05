import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { MatchSorter, MatchType } from '../../util/match-utils';
import { EventSorter } from '../../util/event-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {$} from 'protractor';
import Team from '../../models/Team';
import Match from '../../models/Match';
import Season from '../../models/Season';
import Event from '../../models/Event';

@Component({
  selector: 'toa-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class TeamComponent implements OnInit {

  eventSorter: EventSorter;

  team: Team;
  teamKey: number;

  years: any;

  qualMatches: Match[];
  quartersMatches: Match[];
  semisMatches: Match[];
  finalsMatches: Match[];

  seasons: Season[];
  currentSeason: Season;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals) {
    this.teamKey = this.route.snapshot.params['team_key'];
    // this.currentSeason = { season_key: '1718', description: 'Relic Recovery' };
    this.qualMatches = [];
    this.quartersMatches = [];
    this.semisMatches = [];
    this.finalsMatches = [];
    this.eventSorter = new EventSorter();
  }

  ngOnInit(): void {
    this.years = [];
    this.ftc.getTeam(this.teamKey, "1718").then((data: Team) => {
      if (!data) {
        this.router.navigate(['/not-found']);
      } else {
        this.team = data;
        for (let i = this.team.rookieYear; i <= new Date().getFullYear(); i++) {
          this.years.push(i);
        }
        this.years.reverse();
        if (this.team.rookieYear) {
          this.ftc.getAllSeasons().then((data: Season[]) => {
            this.seasons = this.getTeamSeasons(data).reverse();
            this.selectSeason(this.seasons[0]);
          });
        }
        this.app.setTitle(this.team.teamNameShort + ' (' + this.team.teamKey + ')');
      }
    });
  }

  getTeamSeasons(seasons: Season[]) {
    const year_code = parseInt((this.team.rookieYear + '').toString().substring(2, 4));
    const second_code = year_code + 1;
    let rookie_season_id = '';
    if (year_code < 10) {
      rookie_season_id = '0' + year_code;
    } else {
      rookie_season_id = '' + year_code;
    }
    if (second_code < 10) {
      rookie_season_id += '0' + second_code;
    } else {
      rookie_season_id += '' + second_code;
    }
    for (let i = 0; i < seasons.length; i++) {
      if (rookie_season_id === seasons[i].seasonKey) {
        return seasons.splice(i, seasons.length - 1);
      }
    }
  }

  selectSeason(season: any) {
    this.currentSeason = season;
    this.team.events = [];
    this.ftc.getTeamEvents(this.teamKey, this.currentSeason.seasonKey).then((data: Event[]) => {
      this.team.events = data;
      this.getEventMatches();
    }).catch(() => {
      this.team.events = [];
    });
  }

  getEventMatches() {
    this.team.events = this.eventSorter.sortRev(this.team.events, 0, this.team.events.length - 1);
    for (const event of this.team.events) {
      this.ftc.getEventMatches(event.eventKey).then((data: Match[]) => {
        event.matches = data;
        event.matches = this.sortAndFind(event);

        for (const match of event.matches) {
          if (match.tournamentLevel === MatchType.QUALS_MATCH) {
            this.qualMatches.push(match);
          }
          if (match.tournamentLevel === MatchType.QUARTERS_MATCH_1 ||
            match.tournamentLevel === MatchType.QUARTERS_MATCH_2 ||
            match.tournamentLevel === MatchType.QUARTERS_MATCH_3 ||
            match.tournamentLevel === MatchType.QUARTERS_MATCH_4) {
            this.quartersMatches.push(match);
          }
          if (match.tournamentLevel === MatchType.SEMIS_MATCH_1 ||
            match.tournamentLevel === MatchType.SEMIS_MATCH_2 ) {
            this.semisMatches.push(match);
          }
          if (match.tournamentLevel === MatchType.FINALS_MATCH) {
            this.finalsMatches.push(match);
          }
        }

        // TODO - Make matches about of event object... Maybe do this in the API somehow?

        this.qualMatches = [];
        this.quartersMatches = [];
        this.semisMatches = [];
        this.finalsMatches = [];

        this.getEventRankings();
        this.getEventAwards();
      });
    }
  }

  getEventRankings() {
    for (const ranking of this.team.rankings) {
      for (const event of this.team.events) {
        if (ranking.eventKey === event.eventKey) {
          event.rankings = [ranking];
        }
      }
    }
  }

  getEventAwards() {
    for (const event of this.team.events) {
      const awards = [];
      for (const award of this.team.awards) {
        if (event.eventKey === award.eventKey) {
          if (award.awardName.substring(0, 7) === 'Inspire') {
            awards.push(award);
          }
        }
      }

      for (const award of this.team.awards) {
        if (event.eventKey === award.eventKey) {
          if (award.awardName.substr(-8, 8) === 'Alliance') {
            awards.push(award);
          }
        }
      }

      for (const award of this.team.awards) {
        if (event.eventKey === award.eventKey) {
          if ((award.awardName.substring(0, 7) !== 'Inspire') && (award.awardName.substr(-8, 8) !== 'Alliance')) {
            awards.push(award);
          }
        }
      }

      event.awards = awards;
    }
  }

  sortAndFind(event: Event) {
    let team_matches = [];
    for (const match of event.matches) {
      for (const team of match.participants) {
        if (team.teamKey === this.teamKey) {
          team_matches.push(match);
        }
      }
    }

    const sorter = new MatchSorter();
    team_matches = sorter.sort(team_matches, 0, team_matches.length - 1);
    return team_matches;
  }

  convertSeason(season: any) {
    return season.season_key;
  }

  getStation(match_data, station: number): string {
    const teams = match_data.teams.toString().split(',');
    const stations = match_data.station_status.toString().split(',');
    if (stations[station] === '4') {
      return '';
    } else if (stations[station] === '0') {
      return teams[station] + '*';
    } else {
      return teams[station];
    }
  }

  getStationTeam(match_data, station: number): string {
    const teams = match_data.teams.toString().split(',');
    const stations = match_data.station_status.toString().split(',');

    return teams[station];
  }

  getStationLength(match_data): number {
    return match_data.teams.toString().split(',').length;
  }

  getTeamResult(match, team: number): string {
    // return team.toString();
    if (match.red_score != null) { // match score exists
      if (match.red_score === match.blue_score) {
        return 'T';
      }
      if (match.red_score > match.blue_score) {
        if (this.getStationLength(match) === 6) {
          if ((team.toString() === this.getStationTeam(match, 0))
            || (team.toString() === this.getStationTeam(match, 1))
            || (team.toString() === this.getStationTeam(match, 2))) {
            return 'W';
          } else {
            return 'L';
          }
        } else {
          if ((team.toString() === this.getStationTeam(match, 0))
            || (team.toString() === this.getStationTeam(match, 1))) {
            return 'W';
          } else {
            return 'L';
          }
        }
      } else {
        if (this.getStationLength(match) === 6) {
          if ((team.toString() === this.getStationTeam(match, 0))
            || (team.toString() === this.getStationTeam(match, 1))
            || (team.toString() === this.getStationTeam(match, 2))) {
            return 'L';
          } else {
            return 'W';
          }
        } else {
          if ((team.toString() === this.getStationTeam(match, 0))
            || (team.toString() === this.getStationTeam(match, 1))) {
            return 'L';
          } else {
            return 'W';
          }
        }
      }
    } else {
      return ' '; // no match score yet
    }
  }

  getStationHref(match_data, station: number): string {
    const teams = match_data.teams.toString().split(',');
    const stations = match_data.station_status.toString().split(',');
    return teams[station];
  }

  isCurrentTeam(match_data, station: number): boolean {
    return match_data.teams.toString().split(',')[station] === this.teamKey;
  }

  openTeamPage(team_number: any) {
    this.router.navigate(['/']);
  }

  openMatchDetails(match_data: any) {
    this.router.navigate(['/matches', match_data.match_key]);
  }

  getSeasonString(season: any) {
    const code_one = season.season_key.toString().substring(0, 2);
    const code_two = season.season_key.toString().substring(2, 4);
    return '20' + code_one + '/20' + code_two + (season.description ? ' - ' + season.description : '');
  }
}
