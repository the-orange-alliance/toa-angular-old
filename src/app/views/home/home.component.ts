import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FTCDatabase } from "../../providers/ftc-database";
import { MatchParser } from "../../util/match-utils";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [FTCDatabase]
})
export class HomeComponent {

  current_events: any;

  qual_match: any;
  elim_match: any;
  normal_match: any;
  match_count: number;

  constructor(private router: Router, private ftc: FTCDatabase) {
    this.ftc.getAllMatches().subscribe((data) => {
      this.match_count = data[0].MatchCount;
    }, (err) => {
      console.log(err);
    });
    this.ftc.getHighScoreQual().subscribe((data) => {
      this.qual_match = this.getBestMatch(data);
      this.ftc.getStations(this.qual_match.match_key).subscribe((data) => {
        let teams = "";
        for (let station of data) {
          teams += station.team_key + ",";
        }
        this.qual_match.teams = teams.toString().substring(0, teams.length - 1);
      }, (err) => {
        console.log(err);
      });
      this.ftc.getEventName(this.qual_match.event_key).subscribe((name) => {
        this.qual_match.event_name = name[0].event_name;
      }, (err) => {
        console.log(err);
      })
    }, (err) => {
      console.log(err);
    });
    this.ftc.getHighScoreElim().subscribe((data) => {
      this.elim_match = this.getBestMatch(data);
      this.ftc.getStations(this.elim_match.match_key).subscribe((data) => {
        let teams = "";
        for (let station of data) {
          teams += station.team_key + ",";
        }
        this.elim_match.teams = teams.toString().substring(0, teams.length - 1);
      }, (err) => {
        console.log(err);
      });
      this.ftc.getEventName(this.elim_match.event_key).subscribe((name) => {
        this.elim_match.event_name = name[0].event_name;
      }, (err) => {
        console.log(err);
      })
    }, (err) => {
      console.log(err);
    });
    this.ftc.getHighScoreWithPenalty().subscribe((data) => {
      this.normal_match = this.getBestMatch(data);
      this.ftc.getStations(this.normal_match.match_key).subscribe((data) => {
        let teams = "";
        for (let station of data) {
          teams += station.team_key + ",";
        }
        this.normal_match.teams = teams.toString().substring(0, teams.length - 1);
      }, (err) => {
        console.log(err);
      });
      this.ftc.getEventName(this.normal_match.event_key).subscribe((name) => {
        this.normal_match.event_name = name[0].event_name;
      }, (err) => {
        console.log(err);
      })
    }, (err) => {
      console.log(err);
    });

    this.ftc.getSeasonEvents("1617").subscribe((data) => {
      let today = new Date();
      let next_week = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      console.log(today + " | " + next_week);
      this.current_events = [];
      for (let event of data) {
        if (this.isInDateRange(new Date(event.start_date), new Date(event.end_date), today, next_week)) {
          this.current_events.push(event);
        }
      }
    }, (err) => {
      console.log(err);
    });

  }

  isInDateRange(start_date, end_date, today, next_week) {
    return (start_date >= today && start_date <= next_week) ||
      (today >= start_date && today <= end_date);
  }

  getBestMatch(matches: any) {
    // This will remove matches with duplicate scores
    let last_red_score = null;
    for (let i = 0; i < matches.length; i++) {
      if (last_red_score == matches[i].red_score) {
        matches.splice(i-1, i);
      }
      last_red_score = matches[i].red_score;
    }

    // This will determine which alliance had the higher score
    // Also, red alliance always comes first from the API
    if (matches[0].red_score > matches[1].blue_score) {
      return matches[0];
    } else {
      return matches[1];
    }

  }

  getMatchString(match_data): string {
    return new MatchParser(match_data).toString();
  }

  getStation(match_data, station: number): string {
    return match_data.teams.toString().split(",")[station];
  }

  openTeamPage(team: any) {
    this.router.navigate(['/teams', team]);
  }

  openEvent(event_key, e): void {
    this.router.navigate(['/events', event_key]);
  }

  getNumberOfTeams(match_data) {
    return match_data.teams.toString().split(",").length;
  }

  openMatchDetails(match_data: any) {
    this.router.navigate(['/matches', match_data]);
  }

}
