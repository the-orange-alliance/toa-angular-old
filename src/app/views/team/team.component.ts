import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FTCDatabase } from "../../providers/ftc-database";
import { MatchSorter } from "../../util/match-utils";

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  providers: [FTCDatabase]
})
export class TeamComponent implements OnInit {

  team: any;
  team_key: any;

  current_year: number;
  years: any;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router) {
    this.team_key = this.route.snapshot.params['team_key'];
    this.current_year = 2017;
  }

  ngOnInit(): void {
    this.years = [];
    this.ftc.getTeam(this.team_key, this.current_year).subscribe((data) => {
      this.team = data[0][0];
      this.team.events = data[1];
      for (let i = this.team.rookie_year; i <= new Date().getFullYear(); i++) {
        this.years.push(i);
      }
      this.years.reverse();
      this.getEventMatches();
    }, (err) => {
      console.log(err);
    });
  }

  selectYear(year: number) {
    this.current_year = year;
    this.ftc.getTeamEvents(this.team_key, this.current_year).subscribe((data) => {
      this.team.events = data;
      this.getEventMatches();
    }, (err) => {
      console.log(err);
      this.team.events = [];
    });
  }

  getEventMatches() {
    for (let event of this.team.events) {
      this.ftc.getEventMatches(event.event_key, this.current_year).subscribe((data) => {
        event.match_data = data;
        event.match_data = this.sortAndFind(event);
      }, (err) => {
        console.log(err);
      });
    }
  }

  sortAndFind(event_data: any) {
    let team_matches = [];
    for (let match of event_data.match_data) {
      if (match.teams.toString().indexOf(this.team_key) > -1) {
        team_matches.push(match);
      }
    }

    let sorter = new MatchSorter();
    team_matches = sorter.sort(team_matches, 0, team_matches.length - 1);
    return team_matches;
  }

  getStation(match_data, station: number): string {
    return match_data.teams.toString().split(",")[station];
  }

}
