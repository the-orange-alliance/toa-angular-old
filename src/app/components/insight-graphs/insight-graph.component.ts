import { Component, OnInit, Input } from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import UltimateGoalInsights from '../../models/game-specifics/UltimateGoalInsights';

@Component({
  selector: 'toa-insight-graphs',
  templateUrl: './insight-graphs.component.html',
  styleUrls: ['./insight-graphs.component.scss']
})
export class InsightGraphComponent implements OnInit {

  @Input() insights: {};
  @Input() season: number;

  public lineChartLabels: Label[] = ['October', 'November', 'December', 'January', 'February', 'March', 'April'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {xAxes: [{}], yAxes: [{id: 'y-axis-0', position: 'left', }]},
    annotation: {annotations: [], },
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'top'},
    plugins: {datalabels: {formatter: (value, ctx) => {return ctx.chart.data.labels[ctx.dataIndex]; }}}
  };
  public lineChartPlugins = [pluginAnnotations];
  public pieChartPlugins = [pluginDataLabels];

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // blue
      backgroundColor: 'rgba(0,0,255,0.1)',
      borderColor: 'rgba(0, 0, 200, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  autoAvgRings: ChartDataSets[] = [{data: [], label: 'Avg Auto High Goal'}, {data: [], label: 'Avg Auto Mid Goal'}, {data: [], label: 'Avg Auto Low Goal'}]
  teleAvgRings: ChartDataSets[] = [{data: [], label: 'Avg Tele High Goal'}, {data: [], label: 'Avg Tele Mid Goal'}, {data: [], label: 'Avg Tele Low Goal'}]
  avgPS: ChartDataSets[] = [{data: [], label: 'Avg PowerShots Auton'}, {data: [], label: 'Avg PowerShots Tele'}]
  percentNav: ChartDataSets[] = [{data: [], label: 'Percent Robots Navigated'}]
  percentWobbles: ChartDataSets[] = [{data: [], label: 'Percent Wobbles Delivered'}]
  percentWobblesEnd: ChartDataSets[] = [{data: [], label: 'Percent Wobbles on Start'}, {data: [], label: 'Percent Wobbles in Drop Zone'}]
  matchScore: ChartDataSets[] = [{data: [], label: 'Average Winning Score'}, {data: [], label: 'Average Match Score'}]
  winMargin: ChartDataSets[] = [{data: [], label: 'Average Win Margin'}]

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
        this.matchScore[0].data.push(insight.averageWinningScore)
        this.matchScore[1].data.push(insight.averageMatchScore)
        this.winMargin[0].data.push(insight.averageWinningMargin)
      }
    }
  }
}
