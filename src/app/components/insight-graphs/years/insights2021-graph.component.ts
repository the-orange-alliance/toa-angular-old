import { Component, Input } from '@angular/core';
import UltimateGoalInsights from '../../../models/game-specifics/UltimateGoalInsights';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'toa-insight-graphs-ultimate-goal',
  templateUrl: './insights2021-graphs.component.html',
})

export class InsightGraphs2021Component {
  @Input() autoAvgRings: ChartDataSets[];
  @Input() teleAvgRings: ChartDataSets[];
  @Input() avgPS: ChartDataSets[];
  @Input() percentNav: ChartDataSets[];
  @Input() percentWobbles: ChartDataSets[];
  @Input() percentWobblesEnd: ChartDataSets[];

  @Input() lineChartColors: Color[];
  @Input() lineChartOptions: (ChartOptions & { annotation: any });
  @Input() lineChartLabels: Label[];
  @Input() lineChartPlugins: [];
}
