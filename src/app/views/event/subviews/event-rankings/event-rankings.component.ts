import { Component, OnInit, Input } from '@angular/core';
import Ranking from '../../../../models/Ranking';
import { RankingSorter } from '../../../../util/ranking-utils';
import { DialogText } from '../../../../dialogs/text/dialog-text';
import { MdcDialog } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'toa-event-rankings',
  templateUrl: './event-rankings.component.html',
  providers: [RankingSorter]
})
export class EventRankingsComponent implements OnInit {

  @Input() event: any;
  @Input() rankings: Ranking[];

  showQualPoints = false;
  showTieBreakerPoints = false;
  showHighScore = false;
  showOPR = false;

  constructor(
      private dialog: MdcDialog,
      private translate: TranslateService,
      public sorter: RankingSorter) {
  }

  ngOnInit() {
    this.sorter.byRank(this.rankings);
    this.setHiddenColumns();
  }

  private setHiddenColumns()
  {
    if (this.rankings) {
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
        if (rank.opr && rank.opr > 0) {
          this.showOPR = true;
        }
      }
    }
  }

  showOprHelp() {
    this.translate.get('pages.event.subpages.rankings.what_is_opr').subscribe((res: string) => {
      this.dialog.open(DialogText, {
        scrollable: true,
        data: {
          title: 'OPR - Offensive Power Rating',
          text: res
        }
      });
    });
  }

  showNpOprHelp() {
    this.translate.get('pages.event.subpages.rankings.what_is_opr').subscribe((res: string) => {
      this.dialog.open(DialogText, {
        scrollable: true,
        data: {
          title: 'Non-Penalty OPR',
          text: res
        }
      });
    });
  }
}
