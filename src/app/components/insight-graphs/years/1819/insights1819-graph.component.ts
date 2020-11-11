import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import RoverRuckusInsights from '../../../../models/game-specifics/RoverRuckusInsights';

@Component({
  selector: 'toa-insight-graphs-rover-rukus',
  templateUrl: './insights1819-graphs.component.html',
})

export class InsightGraphs1819Component implements OnInit {
  @Input() insights: any;

  landing: ChartDataSets[] = [{data: [], label: 'Percent Landed Auton'}]
  sampClaim: ChartDataSets[] = [{data: [], label: 'Percent Sampled Auton'}, {data: [], label: 'Percent Claiming Auton'}]
  parking: ChartDataSets[] = [{data: [], label: 'Percent Parked Auton'}]
  teleAvg: ChartDataSets[] = [{data: [], label: 'Avg Gold Scored Tele'}, {data: [], label: 'Avg Silver Scored Tele'}, {data: [], label: 'Avg Depot Minerals Tele'}]
  endLatchedParked: ChartDataSets[] = [{data: [], label: 'Percent Latched End'}, {data: [], label: 'Percent Parked End'}]

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
        const insight = new RoverRuckusInsights().fromJSON(this.insights[i]);
        this.landing[0].data.push(insight.autoPercentLanding)
        this.sampClaim[0].data.push(insight.autoPercentSampling)
        this.sampClaim[1].data.push(insight.autoPercentClaiming)
        this.parking[0].data.push(insight.autoPercentParking)
        this.teleAvg[0].data.push(insight.teleAvgGolds)
        this.teleAvg[1].data.push(insight.teleAvgSilvers)
        this.teleAvg[2].data.push(insight.teleAvgDepotMinerals)
        this.endLatchedParked[0].data.push(insight.endPercentLatched)
        this.endLatchedParked[1].data.push(insight.endPercentParked)
      }
    }
  }
}
