import { Component, OnInit, Input } from '@angular/core';
import { MatchSorter } from '../../../../util/match-utils';

@Component({
  selector: 'toa-event-matches',
  templateUrl: './event-matches.component.html'
})
export class EventMatchesComponent implements OnInit {

  @Input() matches: any;

  constructor() {
    this.matches = [];
  }

  ngOnInit() {
    if (this.matches) {
      this.matches = new MatchSorter().sort(this.matches, 0, this.matches.length - 1);
    }
  }

}
