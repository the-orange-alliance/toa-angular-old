import { Component, Input } from '@angular/core';
import RoverRuckusInsights from '../../../models/game-specifics/RoverRuckusInsights';

@Component({
  selector: 'toa-insights-rover-ruckus',
  template: `<hr/>
  <div class="row">
    <toa-circular-percentage [title]="\'pages.event.subpages.insights.prc_landed' | translate" [value]="insights.autoPercentLanding" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="\'pages.event.subpages.insights.prc_latched' | translate" [value]="insights.endPercentLatched" class="col-6"></toa-circular-percentage>
  </div>
  <div class="row mt-4">
    <toa-circular-percentage [title]="'pages.event.subpages.insights.avg_golds' | translate" [value]="insights.telePercentGolds" [showInNumber]="90" class="col-md-4 col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'pages.event.subpages.insights.avg_silvers' | translate" [value]="insights.telePercentSilvers" [showInNumber]="60" class="col-md-4 col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'pages.event.subpages.insights.avg_depot' | translate" [value]="insights.telePercentDepotMinerals" [showInNumber]="60 + 90" class="col-md-4 col-12"></toa-circular-percentage>
  </div>`
})
export class Insights1819Component {
  @Input() insights: RoverRuckusInsights;
}
