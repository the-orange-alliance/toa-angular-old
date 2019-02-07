import { Component, OnInit, Input } from '@angular/core';
import { MatchSorter } from '../../../../util/match-utils';

@Component({
  selector: 'toa-event-matches',
  templateUrl: './event-matches.component.html'
})
export class EventMatchesComponent implements OnInit {

  @Input() matches: any;
  @Input() rankings: any;
  @Input() teams: any;

  constructor() {
    this.matches = [];
    this.rankings = [];
    this.teams = [];
  }

  ngOnInit() {
    if (this.matches) {
      this.matches = new MatchSorter().sort(this.matches, 0, this.matches.length - 1);
    }
  }
}
