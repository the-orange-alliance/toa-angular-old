import { Component, Input } from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Event from '../../../../models/Event';
import EventInsights from '../../../../models/Insights';
import Match from '../../../../models/Match';

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-insights',
  templateUrl: './event-insights.component.html',
  styleUrls: ['./event-insights.component.scss']
})
export class EventInsightsComponent {

  @Input() event: Event;
  @Input() matches: Match[];
  @Input() qualInsights: EventInsights;
  @Input() elimInsights: EventInsights;

}
