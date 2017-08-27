import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import {RankSorter} from '../../../../util/ranking-utils';

@Component({
  providers: [FTCDatabase],
  selector: 'event-rankings',
  templateUrl: './event-rankings.component.html'
})
export class EventRankingsComponent implements OnInit {

  @Input() event: any;
  @Input() rankings: any;

  rank_sorter: RankSorter;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {
    this.rank_sorter = new RankSorter();
  }

  ngOnInit() {
    if (this.rankings) {
      this.rankings = this.rank_sorter.sort(this.rankings, 0, this.rankings.length - 1);
    }
  }

}
