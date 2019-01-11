import { Component, OnInit, Input } from '@angular/core';
import { RankSorter } from '../../../../util/ranking-utils';

@Component({
  selector: 'toa-event-rankings',
  templateUrl: './event-rankings.component.html'
})
export class EventRankingsComponent implements OnInit {

  @Input() event: any;
  @Input() rankings: any;

  showQualPoints = false;
  showTieBreakerPoints = false;
  showHighScore = false;

  ngOnInit() {
    if (this.rankings) {
      this.rankings = new RankSorter().sort(this.rankings);
      for (const rank of this.rankings) {
        if (rank.qualifyingPoints && rank.qualifyingPoints > 0) {
          this.showQualPoints = true;
        }
        if (rank.tieBreakerPoints && rank.tieBreakerPoints > 0) {
          this.showTieBreakerPoints = true;
        }
        if (rank.highestQualScore && rank.highestQualScore > 0) {
          this.showHighScore = true;
        }
      }
    }
  }
}
