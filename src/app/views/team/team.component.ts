import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FTCDatabase } from "../../providers/ftc-database";
import { MatchSorter, MatchType } from "../../util/match-utils";
import { EventSorter } from "../../util/event-utils";

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  providers: [FTCDatabase]
})
export class TeamComponent implements OnInit {

  event_sorter: EventSorter;

  team: any;
  team_key: any;

  current_year: number;
  years: any;

  qual_matches: any;
  quarters_matches: any;
  semis_matches: any;
  finals_matches: any;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router) {
    this.team_key = this.route.snapshot.params['team_key'];
    this.current_year = 2017;
    this.qual_matches = [];
    this.quarters_matches = [];
    this.semis_matches = [];
    this.finals_matches = [];
    this.event_sorter = new EventSorter();
  }

  ngOnInit(): void {
    this.years = [];
    this.ftc.getTeam(this.team_key, this.current_year).subscribe((data) => {
      if (!data[0][0]) {
        this.router.navigate(["/not-found"]);
      } else {
        this.team = data[0][0];
        this.team.events = data[1];

        for (let i = this.team.rookie_year; i <= new Date().getFullYear(); i++) {
          this.years.push(i);
        }
        this.years.reverse();
        this.getEventMatches();
      }
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
    this.team.events = this.event_sorter.sort(this.team.events, 0, this.team.events.length - 1);

    for (let event of this.team.events) {
      this.ftc.getEventMatches(event.event_key, this.current_year).subscribe((data) => {
        event.match_data = data;
        event.match_data = this.sortAndFind(event);

        for (let match of event.match_data) {
          if (match.tournament_level == MatchType.QUALS_MATCH) {
            this.qual_matches.push(match);
          }
          if (match.tournament_level == MatchType.QUARTERS_MATCH_1 ||
            match.tournament_level == MatchType.QUARTERS_MATCH_2 ||
            match.tournament_level == MatchType.QUARTERS_MATCH_3 ||
            match.tournament_level == MatchType.QUARTERS_MATCH_4) {
            this.quarters_matches.push(match);
          }
          if (match.tournament_level == MatchType.SEMIS_MATCH_1 ||
            match.tournament_level == MatchType.SEMIS_MATCH_2 ) {
            this.semis_matches.push(match);
          }
          if (match.tournament_level == MatchType.FINALS_MATCH) {
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

      }, (err) => {
        console.log(err);
      });
    }
  }

  sortAndFind(event_data: any) {
    let team_matches = [];
    for (let match of event_data.match_data) {
      for (let team of match.teams.split(",")) {
        if (team == this.team_key) {
          team_matches.push(match);
        }
      }
    }

    let sorter = new MatchSorter();
    team_matches = sorter.sort(team_matches, 0, team_matches.length - 1);
    return team_matches;
  }

  getStation(match_data, station: number): string {
    return match_data.teams.toString().split(",")[station]
  }

  isCurrentTeam(match_data, station: number): boolean {
    return match_data.teams.toString().split(",")[station] == this.team_key;
  }

  openTeamPage(team: any) {
    this.router.navigate(['/teams', team]);
  }

  openMatchDetails(match_data: any) {
    this.router.navigate(['/matches', match_data]);
  }

}
