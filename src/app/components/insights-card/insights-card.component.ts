import { Component, OnInit, Input } from '@angular/core';
import Event from '../../models/Event';
import Insights from '../../models/Insights';

@Component({
  selector: 'toa-insights-card',
  templateUrl: './insights-card.component.html',
  styleUrls: ['./insights-card.component.scss']
})
export class InsightsCardComponent implements OnInit {

  @Input() event: Event;
  @Input() insights: Insights;
  @Input() isQual: boolean;

  seasonKey: string;
  highScore = 0;

  ngOnInit() {
    this.seasonKey = this.event.seasonKey;
    if (this.insights && this.insights.highScoreMatch) {
      this.highScore = Math.max(this.insights.highScoreMatch.redScore, this.insights.highScoreMatch.blueScore);
    }
  }
}
