import {Component, Input, OnInit} from '@angular/core';
import UltimateGoalInsights from '../../../../models/game-specifics/UltimateGoalInsights';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import FreightFrenzyInsights from '../../../../models/game-specifics/FreightFrenzyInsights';

@Component({
  selector: 'toa-insight-graphs-freight-frenzy',
  templateUrl: './insights2122-graphs.component.html',
})

export class InsightGraphs2122Component implements OnInit {
  @Input() insights: any;

  autoFreight: ChartDataSets[] = [{data: [], label: 'Avg Level 1 Freight'}, {data: [], label: 'Avg Level 2 Freight'}, {data: [], label: 'Avg Level 3 Freight'}, {data: [], label: 'Avg Storage Freight'}]
  autoParking: ChartDataSets[] = [{data: [], label: 'Percent Partially in Warehouse'}, {data: [], label: 'Percent Completely in Warehouse'}, {data: [], label: 'Percent Partially in Storage'}, {data: [], label: 'Percent Completely in Storage'}]
  autoBonuses: ChartDataSets[] = [{data: [], label: 'Percent Bonuses Received'}]
  teleFreight: ChartDataSets[] = [{data: [], label: 'Avg Level 1 Freight'}, {data: [], label: 'Avg Level 2 Freight'}, {data: [], label: 'Avg Level 3 Freight'}, {data: [], label: 'Avg Shared Freight'}]
  endDelivered: ChartDataSets[] = [{data: [], label: 'Avg Delivered'}]
  endBalanced: ChartDataSets[] = [{data: [], label: 'Percent Alliance Hubs Balanced'}, {data: [], label: 'Percent Shared Hubs Unbalanced'}]
  endCapped: ChartDataSets[] = [{data: [], label: 'Percent Capped'}]
  endCarousel: ChartDataSets[] = [{data: [], label: 'Percent Carousel'}]
  endParking: ChartDataSets[] = [{data: [], label: 'Percent Partially in Warehouse'}, {data: [], label: 'Percent Completely in Warehouse'}]

  @Input() lineChartColors: Color[];
  @Input() lineChartOptions: (ChartOptions & { annotation: any });
  @Input() lineChartLabels: Label[];
  @Input() lineChartPlugins: [];

  constructor() {

  }

  ngOnInit() {
    for (const i in this.insights) {
      if (this.insights.hasOwnProperty(i) && this.insights[i]) {
        const insight = new FreightFrenzyInsights().fromJSON(this.insights[i]);
        this.autoFreight[0].data.push(insight.autoAverageFreight1);
        this.autoFreight[1].data.push(insight.autoAverageFreight2);
        this.autoFreight[2].data.push(insight.autoAverageFreight3);
        this.autoFreight[3].data.push(insight.autoAverageStorageFreight);
        this.autoParking[0].data.push(insight.autoAveragePartialWarehouse);
        this.autoParking[1].data.push(insight.autoAverageCompleteWarehouse);
        this.autoParking[2].data.push(insight.autoAveragePartialStorage);
        this.autoParking[3].data.push(insight.autoAverageCompleteStorage);
        this.autoBonuses[0].data.push(insight.autoAverageBonus);
        this.teleFreight[0].data.push(insight.teleAverageFreight1);
        this.teleFreight[1].data.push(insight.teleAverageFreight2);
        this.teleFreight[2].data.push(insight.teleAverageFreight3);
        this.teleFreight[3].data.push(insight.teleAverageSharedFreight);
        this.endParking[0].data.push(insight.endParkedPartialWarehouse);
        this.endParking[1].data.push(insight.endParkedCompleteWarehouse);
        this.endDelivered[0].data.push(insight.endAverageDelivered);
        this.endBalanced[0].data.push(insight.endAverageHubBalanced);
        this.endBalanced[1].data.push(insight.endAverageSharedHubUnbalanced);
        this.endCapped[0].data.push(insight.averageCapped);
        this.endCarousel[0].data.push(insight.averageCarousel);
      }
    }
  }
}
