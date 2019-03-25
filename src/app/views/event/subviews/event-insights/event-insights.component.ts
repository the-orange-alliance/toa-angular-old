import { Component, OnInit, Input } from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Event from '../../../../models/Event';
import EventInsights from '../../../../models/EventInsights';

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-insights',
  templateUrl: './event-insights.component.html',
  styleUrls: ['./event-insights.component.scss']
})
export class EventInsightsComponent implements OnInit{

  @Input() event: Event;
  @Input() qualInsights: EventInsights;
  @Input() elimInsights: EventInsights;

  qualHighScore: number = 0;
  elimHighScore: number = 0;

  ngOnInit() {
    if (this.qualInsights && this.qualInsights.highScoreMatch) {
      this.qualHighScore = Math.max(this.qualInsights.highScoreMatch.redScore, this.qualInsights.highScoreMatch.blueScore);
    }
    if (this.elimInsights && this.elimInsights.highScoreMatch) {
      this.elimHighScore = Math.max(this.elimInsights.highScoreMatch.redScore, this.elimInsights.highScoreMatch.blueScore);
    }
  }
}
