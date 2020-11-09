import {Component, Input, OnInit} from '@angular/core';
import { MatchBreakdownRow, MatchBreakdownTitle } from '../../../models/MatchBreakdownRow';
import MatchBreakdown1617 from '../years/MatchBreakdown1617';
import MatchBreakdown1718 from '../years/MatchBreakdown1718';
import MatchBreakdown1819 from '../years/MatchBreakdown1819';
import MatchBreakdown1920 from '../years/MatchBreakdown1920';
import MatchBreakdown2021 from '../years/MatchBreakdown2021';
import Match from '../../../models/Match';

@Component({
  selector: 'toa-match-details',
  templateUrl: './match-details.component.html'
})
export class MatchDetailsComponent implements OnInit {

  @Input() match: Match;

  rows: MatchBreakdownRow[] = [];

  constructor() {}

  ngOnInit() {
    const match = this.match;
    if (match.details) {
      switch (this.getMatchSeason()) {
        case 1617:
          this.rows = new MatchBreakdown1617().getRows(match);
          break;
        case 1718:
          this.rows = new MatchBreakdown1718().getRows(match);
          break;
        case 1819:
          this.rows = new MatchBreakdown1819().getRows(match);
          break;
        case 1920:
          this.rows = new MatchBreakdown1920().getRows(match);
          break;
        case 2021:
          this.rows = new MatchBreakdown2021().getRows(match);
          break;
        default:
          this.rows = [
            MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
            MatchBreakdownTitle('Teleop', match.redTeleScore, match.blueTeleScore),
            MatchBreakdownTitle('End Game', match.redEndScore, match.blueEndScore),
            MatchBreakdownTitle('Penalty', match.bluePenalty, match.redPenalty)
          ]
          break;
      }
    } else if (this.match.blueAutoScore > -1) {
      this.rows = [
        MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
        MatchBreakdownTitle('Teleop', match.redTeleScore, match.blueTeleScore),
        MatchBreakdownTitle('End Game', match.redEndScore, match.blueEndScore),
        MatchBreakdownTitle('Penalty', match.bluePenalty, match.redPenalty)
      ]
    }
  }

  getMatchSeason(): number {
    if (this.match) {
      return parseInt(this.match.matchKey.split('-')[0], 10);
    }
    return 0;
  }
}
