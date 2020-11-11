import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import SkystoneInsights from '../../../../models/game-specifics/SkystoneInsights';

@Component({
  selector: 'toa-insight-graphs-skystone',
  templateUrl: './insights1920-graphs.component.html',
})

export class InsightGraphs1920Component implements OnInit {
  @Input() insights: any;

  autoStones: ChartDataSets[] = [{data: [], label: 'Avg Skystones Delivered Auton'}, {data: [], label: 'Avg Stones Delivered Auton'}, {data: [], label: 'Avg Stones Placed Auton'}]
  robotAuton: ChartDataSets[] = [{data: [], label: 'Percent Robots Parked Auton'}, {data: [], label: 'Percent Robots Navigated Auton'}]
  foundation: ChartDataSets[] = [{data: [], label: 'Percent Foundations Moved'}, {data: [], label: 'Percent Foundations Repositioned'}]
  teleStones: ChartDataSets[] = [{data: [], label: 'Avg Skystones Returned Tele'}, {data: [], label: 'Avg Stones Delivered Tele'}, {data: [], label: 'Avg Stones Placed Tele'}]
  averageCapLevel: ChartDataSets[] = [{data: [], label: 'Avg Cap Level'}]
  bonuses: ChartDataSets[] = [{data: [], label: 'Avg Tower Bonus'}, {data: [], label: 'Average Cap Bonus'}, {data: [], label: 'Avg Level Bonus'}]
  percentParked: ChartDataSets[] = [{data: [], label: 'Percent Parked End'}]

  @Input() lineChartColors: Color[];
  @Input() lineChartOptions: (ChartOptions & { annotation: any });
  @Input() lineChartLabels: Label[];
  @Input() lineChartPlugins: [];

  constructor() {
    this.initData();
  }

  ngOnInit() {
    this.initData()
  }

  initData() {
    for (const i in this.insights) {
      if (this.insights.hasOwnProperty(i) && this.insights[i]) {
        const insight = new SkystoneInsights().fromJSON(this.insights[i]);
        this.autoStones[0].data.push(insight.autoAverageSkystonesDelivered);
        this.autoStones[1].data.push(insight.autoAverageStonesDelivered);
        this.autoStones[2].data.push(insight.autoAveragePlaced);
        this.robotAuton[0].data.push(insight.autoPercentParked);
        this.robotAuton[1].data.push(insight.autoPercentNaved);
        this.foundation[0].data.push(insight.percentFoundationMoved);
        this.foundation[1].data.push(insight.percentFoundationRepositioned);
        this.teleStones[0].data.push(insight.teleAverageReturned);
        this.teleStones[1].data.push(insight.teleAverageDelivered);
        this.teleStones[2].data.push(insight.teleAveragePlaced);
        this.averageCapLevel[0].data.push(insight.endAverageCapLevel);
        this.bonuses[0].data.push(insight.endAverageTowerBonus);
        this.bonuses[1].data.push(insight.endAverageCapBonus);
        this.bonuses[2].data.push(insight.endAverageLevelBonus);
        this.percentParked[0].data.push(insight.endPercentParked);
      }
    }
  }
}
