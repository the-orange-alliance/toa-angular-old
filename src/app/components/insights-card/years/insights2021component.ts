import { Component, Input } from '@angular/core';
import RoverRuckusInsights from '../../../models/game-specifics/RoverRuckusInsights';
import UltimateGoalInsights from '../../../models/game-specifics/UltimateGoalInsights';

// TODO: Impliment Translations: [title]="'pages.tralsnation.path' | translate"
@Component({
  selector: 'toa-insights-ultimate-goal',
  template: `<hr/>
  <div class="insight-card-header">Auton Breakout</div>
  <div class="row">
    <toa-circular-percentage [title]="'Average High Rings'" [value]="insights.autoAverageRingsScoredHigh" [max]="40" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Middle Rings'" [value]="insights.autoAverageRingsScoredMid" [max]="40" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Low Rings'" [value]="insights.autoAverageRingsScoredLow" [max]="40" class="col-4"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Average PowerShots Hit'" [value]="insights.autoAveragePowerShots" [max]="10" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Wobble Goals Delivered'" [value]="insights.autoPercentWobblesDelivered" class="col-6"></toa-circular-percentage>
  </div>
  <div class="row">
    <toa-circular-percentage [title]="'Percent Robots Parked on Line (Navigated)'" [value]="insights.autoPercentNavigated" class="col-12"></toa-circular-percentage>
  </div>
  <hr/>
  <div class="insight-card-header">Teleop Breakout</div>
  <div class="row">
    <toa-circular-percentage [title]="'Average High Rings'" [value]="insights.teleAverageRingsScoredHigh" [max]="40" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Middle Rings'" [value]="insights.teleAverageRingsScoredMid" [max]="40" class="col-4"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average Low Rings'" [value]="insights.teleAverageRingsScoredLow" [max]="40" class="col-4"></toa-circular-percentage>
  </div>
  <hr/>
  <div class="insight-card-header">End Game Breakout</div>
  <div class="row">
    <toa-circular-percentage [title]="'Average Rings on Wobble Goals'" [value]="insights.endAverageRingsOnWobble" [max]="20" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Average PowerShots Hit'" [value]="insights.endAveragePowerShots" [max]="20" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Wobble Goals on Start Line'" [value]="insights.endPercentWobblesOnStart" class="col-6"></toa-circular-percentage>
    <toa-circular-percentage [title]="'Percent Wobble Goals in Drop Zone'" [value]="insights.endPercentWobblesInDropZone" class="col-6"></toa-circular-percentage>
  </div>`
})
export class Insights2021component {
  @Input() insights: UltimateGoalInsights;
}
