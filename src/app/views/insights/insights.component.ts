import { Component, OnInit } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AppBarService } from '../../app-bar.service';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MdcTabActivatedEvent } from '@angular-mdc/web';
import { Router } from '@angular/router';
import UltimateGoalInsights from '../../models/game-specifics/UltimateGoalInsights';

@Component({
  selector: 'toa-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
  providers: [TheOrangeAllianceGlobals, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})

export class InsightsComponent implements OnInit {

  insightsQuals: any = null;
  insightsElims: any = null;
  insightsSingle: any = null;
  insightsCombo: any = null;

  activeTab = 0;

  constructor(private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals, protected sanitizer: DomSanitizer,
              private loca: Location, private router: Router, private appBarService: AppBarService) {
    this.app.setTitle('Insights');
  }

  ngOnInit(): void {
    this.appBarService.setTitle('Insights');
    this.ftc.getInsights(2021, 'quals', 'excluded').then(data => {
      this.insightsQuals = data;
    });
    this.ftc.getInsights(2021, 'elims', 'excluded').then(data => {
      this.insightsElims = data;
    });
    this.ftc.getInsights(2021, 'quals', 'only').then(data => {
      this.insightsSingle = data;
    });
    this.ftc.getInsights(2021, 'quals', 'included').then(data => {
      this.insightsCombo = data;
    });

    if (this.router.url.indexOf('/insights/quals') > -1) {
      this.activeTab = 0;
    } else if (this.router.url.indexOf('/insights/elims') > -1) {
      this.activeTab = 1;
    } else if (this.router.url.indexOf('/insights/stquals') > -1) {
      this.activeTab = 2;
    } else if (this.router.url.indexOf('/insights/combined') > -1) {
      this.activeTab = 3;
    } else {
      this.changeUrlNoRoute('quals')
    }
  }

  sendAnalytic(category, label, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: 10
    });
  }

  onTab(event) {
    this.activeTab = event.index;
  }

  changeUrlNoRoute(route: any) {
    this.loca.go(`insights/${route}`);
  }
}
