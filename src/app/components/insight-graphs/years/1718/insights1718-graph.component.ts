import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import RoverRuckusInsights from '../../../../models/game-specifics/RoverRuckusInsights';
import RelicRecoveryInsights from '../../../../models/game-specifics/RelicRecoveryInsights';

@Component({
  selector: 'toa-insight-graphs-relic-recovery',
  templateUrl: './insights1718-graphs.component.html',
})

export class InsightGraphs1718Component implements OnInit {
  @Input() insights: any;

  autoGlyphs: ChartDataSets[] = [{data: [], label: 'Avg Glyphs Auton'}]
  glyphsCiphers: ChartDataSets[] = [{data: [], label: 'Avg Glyphs Teleop'}, {data: [], label: 'Avg Ciphers Teleop'}]
  endRelics: ChartDataSets[] = [{data: [], label: 'Avg Relic 1'}, {data: [], label: 'Avg Relic 2'}, {data: [], label: 'Avg Relic 3'}, ]
  percentStanding: ChartDataSets[] = [{data: [], label: 'Percent Relics Standing'}]
  balanced: ChartDataSets[] = [{data: [], label: 'Average Robots Balanced'}]

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
        const insight = new RelicRecoveryInsights().fromJSON(this.insights[i]);
        this.autoGlyphs[0].data.push(insight.autoAverageGlyphs);
        this.glyphsCiphers[0].data.push(insight.teleAverageGlyphs);
        this.glyphsCiphers[1].data.push(insight.teleAverageCiphers);
        this.endRelics[0].data.push(insight.endAverageRelic1);
        this.endRelics[1].data.push(insight.endAverageRelic2);
        this.endRelics[2].data.push(insight.endAverageRelic3);
        this.percentStanding[0].data.push(insight.endPercentRelicStanding);
        this.balanced[0].data.push(insight.endAverageBalanced);
      }
    }
  }
}
