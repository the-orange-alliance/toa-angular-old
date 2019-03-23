import { Component, OnInit, Input } from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Event from '../../../../models/Event';
import EventInsights from "../../../../models/EventInsights";

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-insights',
  templateUrl: './event-insights.component.html',
  styleUrls: ['./event-insights.component.scss']
})
export class EventInsightsComponent implements OnInit{

  @Input() event: Event;
  @Input() insights: EventInsights;

  qualHighScore: number = 0;
  elimHighScore: number = 0;

  ngOnInit() {
    console.log(this.insights)
    if (this.insights && this.insights.qualHighScoreMatch) {
      this.qualHighScore = Math.max(this.insights.qualHighScoreMatch.redScore, this.insights.qualHighScoreMatch.blueScore);
    }
    if (this.insights && this.insights.elimHighScoreMatch) {
      this.elimHighScore = Math.max(this.insights.elimHighScoreMatch.redScore, this.insights.elimHighScoreMatch.blueScore);
    }
  }
}
