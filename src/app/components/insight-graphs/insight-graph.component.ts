import { Component, OnInit, Input } from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import Insights from '../../models/Insights';

@Component({
  selector: 'toa-insight-graphs',
  templateUrl: './insight-graphs.component.html',
  styleUrls: ['./insight-graphs.component.scss']
})
export class InsightGraphComponent implements OnInit {

  @Input() insights: {};
  @Input() season: string;

  public lineChartLabels: Label[] = ['October', 'November', 'December', 'January', 'February', 'March', 'April'];
  public lineChartLabelsOld: Label[] = [];
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

  matchScore: ChartDataSets[] = [{data: [], label: 'Average Winning Score'}, {data: [], label: 'Average Match Score'}]
  winMargin: ChartDataSets[] = [{data: [], label: 'Average Win Margin'}]

  constructor() {
    // add all the weeks to the old week style
    let i = 3;
    while (i <= 21) {
      if (i === 7) {i++; } // skip 7 (thanksgiving)
      if (i === 11) {i += 2; }// skip week 11/12 (christmas/new years)
      this.lineChartLabelsOld.push('Week ' + i)
      i++;
    }
    this.lineChartLabelsOld.push('West SuperRegional', 'North SuperRegional', 'CMP Houston', 'CMP Detroit', 'Offseason')
  }

  ngOnInit() {
    for (const i in this.insights) {
      if (this.insights.hasOwnProperty(i) && this.insights[i]) {
        const insight = new Insights().fromJSON(this.insights[i]);
        this.matchScore[0].data.push(insight.averageWinningScore)
        this.matchScore[1].data.push(insight.averageMatchScore)
        this.winMargin[0].data.push(insight.averageWinningMargin)
      }
    }
  }
}
