import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import { MatchParser, MatchSorter, MatchType } from '../../../../util/match-utils';

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-matches',
  templateUrl: './event-matches.component.html'
})
export class EventMatchesComponent implements OnInit {

  @Input() matches: any;

  match_sorter: MatchSorter;

  qual_matches: any;
  quarters_matches: any;
  semis_matches: any;
  finals_matches: any;

  match_levels: any;

  constructor(private ftc: FTCDatabase, private router: Router) {
    this.match_sorter = new MatchSorter();
    this.qual_matches = [];
    this.quarters_matches = [];
    this.semis_matches = [];
    this.finals_matches = [];

    this.match_levels = [];
  }

  ngOnInit() {
    if (this.matches) {
      this.matches = this.match_sorter.sort(this.matches, 0, this.matches.length - 1);

      for (const match of this.matches) {
        if (match.tournament_level === MatchType.QUALS_MATCH) {
          this.qual_matches.push(match);
          this.match_levels.push({
            'quals': match
          });
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

    }
  }

  getMatchString(match_data): string {
    return new MatchParser(match_data).toString();
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
  getStationHref(match_data, station: number): string {
    const teams = match_data.teams.toString().split(',');
    const stations = match_data.station_status.toString().split(',');
    return teams[station];
  }

  openTeamPage(team: any) {
    this.router.navigate(['/teams', team.replace("[*]","")]);
  }

  getNumberOfTeams(match_data) {
    return match_data.teams.toString().split(',').length;
  }

  openMatchDetails(match_data: any) {
    this.router.navigate(['/matches', match_data.match_key]);
  }

}
