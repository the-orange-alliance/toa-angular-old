import { Component, Input } from '@angular/core';
import RoverRuckusInsights from '../../../models/game-specifics/RoverRuckusInsights';
import UltimateGoalInsights from '../../../models/game-specifics/UltimateGoalInsights';
import FreightFrenzyInsights from '../../../models/game-specifics/FreightFrenzyInsights';

// TODO: Impliment Translations: [title]="'pages.tralsnation.path' | translate"
@Component({
  selector: 'toa-insights-freight-frenzy',
  template: `<hr/>
  <div class="insight-card-header">Auton Breakout</div>
  <div class="row">
    <toa-circular-percentage [title]="'Percent Partially in Storage'" [value]="insights.autoAveragePartialStorage" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Completely in Storage'" [value]="insights.autoAverageCompleteStorage" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Partially in Warehouse'" [value]="insights.autoAveragePartialWarehouse" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Completely in Warehouse'" [value]="insights.autoAverageCompleteWarehouse" class="col-3"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Average Level 1 Freight'" [value]="insights.autoAverageFreight1" [max]="10" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Level 2 Freight'" [value]="insights.autoAverageFreight2" [max]="10" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Level 3 Freight'" [value]="insights.autoAverageFreight3" [max]="10" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Storage Freight'" [value]="insights.autoAverageStorageFreight" [max]="10" class="col-3"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Percent Bonuses Earned'" [value]="insights.autoAverageBonus" class="col-12"></toa-circular-percentage>
  </div>
  <hr/>
  <div class="insight-card-header">Teleop Breakout</div>
  <div class="row">
    <toa-circular-percentage [title]="'Average Level 1 Freight'" [value]="insights.teleAverageFreight1" [max]="40" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Level 2 Freight'" [value]="insights.teleAverageFreight2" [max]="40" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Level 3 Freight'" [value]="insights.teleAverageFreight3" [max]="40" class="col-3"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Storage Freight'" [value]="insights.teleAverageSharedFreight" [max]="40" class="col-3"></toa-circular-percentage>
  </div>
  <hr/>
  <div class="insight-card-header">End Game Breakout</div>
  <div class="row">
    <toa-circular-percentage [title]="'Percent Alliance Hubs Balanced'" [value]="insights.endAverageHubBalanced" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Shared Hubs Unbalanced'" [value]="insights.endAverageSharedHubUnbalanced" class="col-6"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Percent Partially in Warehouse'" [value]="insights.endParkedPartialWarehouse" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Completely in Warehouse'" [value]="insights.endParkedCompleteWarehouse" class="col-6"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Percent Capped'" [value]="insights.averageCapped" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Carousels'" [value]="insights.averageCarousel" class="col-6"></toa-circular-percentage>
  </div>`
})
export class Insights2122component {
  @Input() insights: FreightFrenzyInsights;
}
