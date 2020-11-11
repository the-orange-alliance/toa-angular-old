import {Component, Input, OnInit} from '@angular/core';
import UltimateGoalInsights from '../../../../models/game-specifics/UltimateGoalInsights';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'toa-insight-graphs-ultimate-goal',
  templateUrl: './insights2021-graphs.component.html',
})

export class InsightGraphs2021Component implements OnInit {
  @Input() insights: any;

  autoAvgRings: ChartDataSets[] = [{data: [], label: 'Avg Auto High Goal'}, {data: [], label: 'Avg Auto Mid Goal'}, {data: [], label: 'Avg Auto Low Goal'}]
  teleAvgRings: ChartDataSets[] = [{data: [], label: 'Avg Tele High Goal'}, {data: [], label: 'Avg Tele Mid Goal'}, {data: [], label: 'Avg Tele Low Goal'}]
  avgPS: ChartDataSets[] = [{data: [], label: 'Avg PowerShots Auton'}, {data: [], label: 'Avg PowerShots Tele'}]
  percentNav: ChartDataSets[] = [{data: [], label: 'Percent Robots Navigated'}]
  percentWobbles: ChartDataSets[] = [{data: [], label: 'Percent Wobbles Delivered'}]
  percentWobblesEnd: ChartDataSets[] = [{data: [], label: 'Percent Wobbles on Start'}, {data: [], label: 'Percent Wobbles in Drop Zone'}]

  @Input() lineChartColors: Color[];
  @Input() lineChartOptions: (ChartOptions & { annotation: any });
  @Input() lineChartLabels: Label[];
  @Input() lineChartPlugins: [];

  constructor() {

  }

  ngOnInit() {
    for (const i in this.insights) {
      if (this.insights.hasOwnProperty(i) && this.insights[i]) {
        const insight = new UltimateGoalInsights().fromJSON(this.insights[i]);
        this.autoAvgRings[0].data.push(insight.autoAverageRingsScoredHigh);
        this.autoAvgRings[1].data.push(insight.autoAverageRingsScoredMid);
        this.autoAvgRings[2].data.push(insight.autoAverageRingsScoredLow);
        this.teleAvgRings[0].data.push(insight.teleAverageRingsScoredHigh);
        this.teleAvgRings[1].data.push(insight.teleAverageRingsScoredMid);
        this.teleAvgRings[2].data.push(insight.teleAverageRingsScoredLow);
        this.avgPS[0].data.push(insight.autoAveragePowerShots);
        this.avgPS[1].data.push(insight.endAveragePowerShots);
        this.percentNav[0].data.push(insight.autoPercentNavigated)
        this.percentWobbles[0].data.push(insight.autoPercentWobblesDelivered)
        this.percentWobblesEnd[0].data.push(insight.endPercentWobblesOnStart)
        this.percentWobblesEnd[1].data.push(insight.endPercentWobblesInDropZone)
      }
    }
  }
}
