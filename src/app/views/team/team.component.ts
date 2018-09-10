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
import Region from '../../models/Region';

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

  regions: any;

  years: any;

  seasons: Season[];
  currentSeason: Season;
  thisSeason: Season;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals) {
    this.teamKey = this.route.snapshot.params['team_key'];
    this.eventSorter = new EventSorter();
  }

  public ngOnInit(): void {
    this.years = [];
    this.ftc.getTeam(this.teamKey, this.ftc.year).then((team: Team) => {
      if (!team) {
        this.router.navigate(['/not-found']);
      } else {
        this.team = team;
        for (let i = this.team.rookieYear; i <= new Date().getFullYear(); i++) {
          this.years.push(i);
        }
        this.years.reverse();
        if (this.team.rookieYear >= 0) {
          this.ftc.getAllSeasons().then((data: Season[]) => {
            this.seasons = this.getTeamSeasons(data).reverse();
            this.selectSeason(this.seasons[0]);
            this.thisSeason = this.seasons[0];
          });
        }
        this.app.setTitle(this.team.teamNameShort + ' (' + this.team.teamKey + ')');
      }
    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      this.regions = data;
    }, (err) => {
      console.log(err);
    });
  }

  public getTeamSeasons(seasons: Season[]): Season[] {
    const year_code = parseInt((this.team.rookieYear + '').toString().substring(2, 4), 10);
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
    return seasons;
  }

  public selectSeason(season: any) {
    this.currentSeason = season;
    this.team.events = [];
    this.ftc.getTeamEvents(this.teamKey, this.currentSeason.seasonKey).then((data: Event[]) => {
      this.team.events = data;
      this.getEventMatches();
    }).catch(() => {
      this.team.events = [];
    });
  }

  private getEventMatches() {
    this.team.events = this.eventSorter.sortRev(this.team.events, 0, this.team.events.length - 1);
    for (const event of this.team.events) {
      this.ftc.getEventMatches(event.eventKey).then((data: Match[]) => {
        event.matches = data;
        event.matches = this.sortAndFind(event);
        this.getEventRankings();
        this.getEventAwards();
      });
    }
  }

  private getEventRankings() {
    for (const ranking of this.team.rankings) {
      for (const event of this.team.events) {
        if (ranking.eventKey === event.eventKey) {
          event.rankings = [ranking];
        }
      }
    }
  }

  private getEventAwards() {
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

  private sortAndFind(event: Event): Match[] {
    let teamMatches = [];
    for (const match of event.matches) {
      for (const team of match.participants) {
        if (team.teamKey === this.teamKey) {
          teamMatches.push(match);
        }
      }
    }

    const sorter = new MatchSorter();
    teamMatches = sorter.sort(teamMatches, 0, teamMatches.length - 1);
    return teamMatches;
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

  fixCountry(country) {
    if (this.regions) {
      const region = this.regions.filter(obj => obj.regionKey === country);
      if (region.length === 1 && region[0].description && country.toUpperCase() !== 'USA') {
        return region[0].description
      } else {
        return country;
      }
    } else {
      return country;
    }
  }

  scrollToEvent(id: string) {
    const element = document.getElementById(id);
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop + 65
    });

  }
}
