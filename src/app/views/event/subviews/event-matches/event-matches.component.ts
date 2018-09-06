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

  constructor(private ftc: FTCDatabase, private router: Router) {
    this.match_sorter = new MatchSorter();
    this.matches = [];
  }

  ngOnInit() {
    if (this.matches) {
      this.matches = this.match_sorter.sort(this.matches, 0, this.matches.length - 1);
    }
  }

}
