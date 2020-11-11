import { Component, Input } from '@angular/core';
import SkystoneInsights from '../../../models/game-specifics/SkystoneInsights';

@Component({
  selector: 'toa-insights-skystone',
  template: `<hr/>
  <div class="row">
    <toa-circular-percentage [title]="'Average Skystones Delivered Auton'" [value]="insights.autoAverageSkystonesDelivered" [max]="6" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Stones Delivered Auton'" [value]="insights.autoAverageStonesDelivered" [max]="6" class="col-6"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Average Parked Auton'" [value]="insights.autoAveragePlaced" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Placed Auton'" [value]="insights.autoAveragePlaced" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Foundations Repositioned Auton'" [value]="insights.percentFoundationRepositioned" class="col-4"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Average Returned Tele'" [value]="insights.teleAverageReturned" [max]="30" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Placed Tele'" [value]="insights.teleAveragePlaced" [max]="30" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Delivered Tele'" [value]="insights.teleAverageDelivered" [max]="30" class="col-4"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Average Cap Level'" [value]="insights.endAverageCapLevel" [max]="10" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Parked End'" [value]="insights.endPercentParked" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Foundations Moved End'" [value]="insights.percentFoundationMoved" class="col-4"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Average Tower Bonus'" [value]="insights.endAverageTowerBonus" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Cap Bonus'" [value]="insights.endAverageCapBonus" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Level Bonus'" [value]="insights.endAverageLevelBonus" class="col-4"></toa-circular-percentage>
  </div>`
})
export class Insights1920Component {
  @Input() insights: SkystoneInsights;
}
