import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatchBreakdownRow } from '../../../models/MatchBreakdownRow';
import MatchBreakdown1617 from '../years/MatchBreakdown1617';
import MatchBreakdown1718 from '../years/MatchBreakdown1718';
import MatchBreakdown1819 from '../years/MatchBreakdown1819';
import Match from '../../../models/Match';

@Component({
  selector: 'toa-match-details',
  templateUrl: './match-details.component.html'
})
export class MatchDetailsComponent implements OnInit {

  @Input() match: Match;

  rows: MatchBreakdownRow[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.match.details) {
      switch (this.getMatchSeason()) {
        case 1617:
          this.rows = new MatchBreakdown1617().getRows(this.match);
          break;
        case 1718:
          this.rows = new MatchBreakdown1718().getRows(this.match);
          break;
        case 1819:
          this.rows = new MatchBreakdown1819().getRows(this.match);
          break;
      }
    }
  }

  getMatchSeason(): number {
    if (this.match) {
      return parseInt(this.match.matchKey.split('-')[0]);
    }
    return 0;
  }
}
