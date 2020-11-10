import { Component, OnInit, Input } from '@angular/core';
import { MatchSorter } from '../../../../util/match-utils';
import Match from '../../../../models/Match';

@Component({
  selector: 'toa-event-matches',
  templateUrl: './event-matches.component.html'
})
export class EventMatchesComponent implements OnInit {

  @Input() matches: any;
  @Input() rankings: any;
  @Input() teams: any;

  private singleTeamSort: any[];

  constructor() {
    this.matches = [];
    this.rankings = [];
    this.teams = [];
    this.singleTeamSort = [];
  }

  ngOnInit() {
    if (this.matches) {
      this.matches = new MatchSorter().sort(this.matches, 0, this.matches.length - 1);

      // Sort for single team matches (Doing it this way is stupid. But does it work? yes :P)
      if (this.matches.length > 0 && this.matches[0] && this.matches[0].participants && this.matches[0].participants.length === 1) {
        const singleTeamObject = {};
        for (const m of this.matches) {
          const match: Match = m as Match;
          const teamNum = match.participants[0].teamKey;
          if (!singleTeamObject[teamNum]) {
            singleTeamObject[teamNum] = [];
          }
          singleTeamObject[teamNum].push(match);
        }
        // Convert to array
        for (const t in singleTeamObject) {
          if (singleTeamObject[t]) {
            this.singleTeamSort.push(singleTeamObject[t]);
          }
        }
      }
    }
  }
}
