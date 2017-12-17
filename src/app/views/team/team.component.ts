import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { MatchSorter, MatchType } from '../../util/match-utils';
import { EventSorter } from '../../util/event-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-team',
  templateUrl: './team.component.html',
  providers: [FTCDatabase,TheOrangeAllianceGlobals]
})
export class TeamComponent implements OnInit {

  event_sorter: EventSorter;

  team: any;
  team_key: any;

  years: any;

  qual_matches: any;
  quarters_matches: any;
  semis_matches: any;
  finals_matches: any;

  seasons: any;
  current_season: any;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private globaltoa:TheOrangeAllianceGlobals) {
    this.team_key = this.route.snapshot.params['team_key'];
    this.current_season = { season_key: '1718', season_desc: 'Relic Recovery' };
    this.qual_matches = [];
    this.quarters_matches = [];
    this.semis_matches = [];
    this.finals_matches = [];
    this.event_sorter = new EventSorter();
  }

  ngOnInit(): void {
    this.years = [];
    this.ftc.getTeam(this.team_key).subscribe((data) => {
      if (!data[0][0]) {
        this.router.navigate(['/not-found']);
      } else {
        this.team = data[0][0];
        this.team.events = data[1];
        this.team.rankings = data[2];
        this.team.awards = data[3];
        for (let i = this.team.rookie_year; i <= new Date().getFullYear(); i++) {
          this.years.push(i);
        }
        this.years.reverse();
        this.getEventMatches();

        this.ftc.getAllSeasons().subscribe((data) => {
          this.seasons = this.getTeamSeasons(data).reverse();
        }, (err) => {
          console.log(err);
        });
        this.globaltoa.setTitle(this.team.team_name_short + " (" + this.team.team_key +")");
      }
    }, (err) => {
      console.log(err);
    });

  }

  getTeamSeasons(season_data: any) {
    let year_code = parseInt((this.team.rookie_year + "").toString().substring(2, 4));
    let second_code = year_code + 1;
    let rookie_season_id = "";
    if (year_code < 10) {
      rookie_season_id = "0" + year_code;
    } else {
      rookie_season_id = "" + year_code;
    }
    if (second_code < 10) {
      rookie_season_id += "0" + second_code;
    } else {
      rookie_season_id += "" + second_code;
    }
    for (let i = 0; i < season_data.length; i++) {
      if (rookie_season_id == season_data[i].season_key) {
        return season_data.splice(i, season_data.length - 1);
      }
    }
  }

  selectSeason(season: any) {
    this.current_season = season;
    this.team.events = [];
    this.ftc.getTeamEvents(this.team_key, this.convertSeason(this.current_season)).subscribe((data) => {
      this.team.events = data;
      this.getEventMatches();
    }, (err) => {
      console.log(err);
      this.team.events = [];
    });
  }

  getEventMatches() {
    this.team.events = this.event_sorter.sortRev(this.team.events, 0, this.team.events.length - 1);

    for (const event of this.team.events) {
      this.ftc.getEventMatches(event.event_key, this.convertSeason(this.current_season)).subscribe((data) => {
        event.match_data = data;
        event.match_data = this.sortAndFind(event);

        for (const match of event.match_data) {
          if (match.tournament_level === MatchType.QUALS_MATCH) {
            this.qual_matches.push(match);
          }
          if (match.tournament_level === MatchType.QUARTERS_MATCH_1 ||
            match.tournament_level === MatchType.QUARTERS_MATCH_2 ||
            match.tournament_level === MatchType.QUARTERS_MATCH_3 ||
            match.tournament_level === MatchType.QUARTERS_MATCH_4) {
            this.quarters_matches.push(match);
          }
          if (match.tournament_level === MatchType.SEMIS_MATCH_1 ||
            match.tournament_level === MatchType.SEMIS_MATCH_2 ) {
            this.semis_matches.push(match);
          }
          if (match.tournament_level === MatchType.FINALS_MATCH) {
            this.finals_matches.push(match);
          }
        }

        event.qual_matches = this.qual_matches;
        event.quarters_matches = this.quarters_matches;
        event.semis_matches = this.semis_matches;
        event.finals_matches = this.finals_matches;

        this.qual_matches = [];
        this.quarters_matches = [];
        this.semis_matches = [];
        this.finals_matches = [];

        this.getEventRankings();
        this.getEventAwards();
      }, (err) => {
        console.log(err);
      });
    }
  }

  getEventRankings() {
    for (const ranking of this.team.rankings) {
      for (const event of this.team.events) {
        if (ranking.event_key === event.event_key) {
          event.ranking = ranking;
        }
      }
    }
  }

  getEventAwards() {
    for (const event of this.team.events) {
      const awards = [];
      for (const award of this.team.awards) {
        if (event.event_key === award.event_key) {
          awards.push(award);
        }
      }
      event.awards = awards;
    }
  }

  sortAndFind(event_data: any) {
    let team_matches = [];
    for (const match of event_data.match_data) {
      for (const team of match.teams.split(',')) {
        if (team === this.team_key) {
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
    if (stations[station] === '0') {
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
  
  getTeamResult(match, team:number): string {
    //return team.toString();
	if (match.red_score!=null) { // match score exists
	  if (match.red_score == match.blue_score) {
	    return "T";
	  }
	  if (match.red_score > match.blue_score) {
	    if (this.getStationLength(match) == 6) {
		  if ((team.toString() == this.getStationTeam(match,0)) ||(team.toString() == this.getStationTeam(match,1)) ||(team.toString() == this.getStationTeam(match,2))) {
		    return "W";
		  } else {
			return "L";
		  }
		} else {
		  if ((team.toString() == this.getStationTeam(match,0)) ||(team.toString() == this.getStationTeam(match,1))) {
		    return "W";
		  } else {
			return "L";
		  }
		}
	  } else {
	  	if (this.getStationLength(match) == 6) {
		  if ((team.toString() == this.getStationTeam(match,0)) ||(team.toString() == this.getStationTeam(match,1)) ||(team.toString() == this.getStationTeam(match,2))) {
		    return "L";
		  } else {
			return "W";
		  }
		} else {
		  if ((team.toString() == this.getStationTeam(match,0)) ||(team.toString() == this.getStationTeam(match,1))) {
		    return "L";
		  } else {
			return "W";
		  }
		}
	  }
	} else {
	  return " "; // no match score yet
	}
  }
  getStationHref(match_data, station: number): string {
    const teams = match_data.teams.toString().split(',');
    const stations = match_data.station_status.toString().split(',');
    return teams[station];
  }



  isCurrentTeam(match_data, station: number): boolean {
    return match_data.teams.toString().split(',')[station] === this.team_key;
  }

  openTeamPage(team_number: any) {
    this.router.navigate(['/']);
  }

  openMatchDetails(match_data: any) {
    this.router.navigate(['/matches', match_data.match_key]);
  }

  getSeasonString(season: any) {
    let code_one = season.season_key.toString().substring(0, 2);
    let code_two = season.season_key.toString().substring(2, 4);
    return "20" + code_one + "/20" + code_two;
  }

}
