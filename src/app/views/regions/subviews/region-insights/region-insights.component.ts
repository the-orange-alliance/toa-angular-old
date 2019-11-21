import { Component, Input } from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Event from '../../../../models/Event';
import EventInsights from '../../../../models/Insights';
import Match from '../../../../models/Match';

@Component({
  providers: [FTCDatabase],
  selector: 'region-event-insights',
  templateUrl: './region-insights.component.html',
  styleUrls: ['./region-insights.component.scss']
})
export class RegionsInsightsComponent {

  @Input() event: Event;
  @Input() matches: Match[];
  @Input() qualInsights: EventInsights;
  @Input() elimInsights: EventInsights;

}
