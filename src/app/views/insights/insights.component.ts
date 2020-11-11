import {ApplicationRef, Component, OnInit} from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AppBarService } from '../../app-bar.service';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MdcTabActivatedEvent } from '@angular-mdc/web';
import { Router } from '@angular/router';
import UltimateGoalInsights from '../../models/game-specifics/UltimateGoalInsights';
import Season from '../../models/Season';
import Event from '../../models/Event';
import {EventFilter, EventSorter} from '../../util/event-utils';

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

  seasons: Season[] = [];
  currentSeason: Season = null;

  activeTab = 0;

  constructor(private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals, protected sanitizer: DomSanitizer,
              private loca: Location, private router: Router, private appBarService: AppBarService, private appRef: ApplicationRef) {
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

    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data.reverse();
      this.selectSeason(this.getCurrentSeason());
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

  seasonStringToSeason(season: string): Season {
    for (const s of this.seasons) {
      if (s.seasonKey === season) {
        return s;
      }
    }
    return this.getCurrentSeason();
  }

  getCurrentSeason(): Season {
    for (const season of this.seasons) {
      if (season.seasonKey === this.ftc.year) {
        return season;
      }
    }
    return null;
  }

  onSeasonChange(event: {index: any, value: any}) {
    event.index = (event.index < 0) ? 0 : event.index;
    this.selectSeason(this.seasons[event.index]);
  }

  selectSeason(season: Season) {
    if (this.currentSeason === null || this.currentSeason.seasonKey !== season.seasonKey) {
      this.insightsQuals = undefined;
      this.insightsElims = undefined;
      this.insightsSingle = undefined;
      this.insightsCombo = undefined;

      this.currentSeason = season;
      if (this.activeTab > 1) {
        this.activeTab = 0;
      }

      this.ftc.getInsights(this.currentSeason.seasonKey, 'quals', 'excluded').then((data: any) => {
        this.insightsQuals = data;
      }).catch(() => {});

      this.ftc.getInsights(this.currentSeason.seasonKey, 'elims', 'excluded').then((data: any) => {
        this.insightsElims = data;
      }).catch(() => {});

      if (this.currentSeason.seasonKey === '2021') {
        this.ftc.getInsights(this.currentSeason.seasonKey, 'quals', 'only').then((data: any) => {
          this.insightsSingle = data;
        }).catch(() => {});

        this.ftc.getInsights(this.currentSeason.seasonKey, 'quals', 'included').then((data: any) => {
          this.insightsCombo = data;
        }).catch(() => {});
      }
    }
  }

  getSeasonString(seasonKey: string, description?: string) {
    const codeOne = seasonKey.toString().substring(0, 2);
    const codeTwo = seasonKey.toString().substring(2, 4);

    if (description) {
      return '20' + codeOne + '/' + codeTwo + ' - ' + description;
    } else {
      return '20' + codeOne + '/' + codeTwo;
    }
  }

  onTab(event) {
    this.activeTab = event.index;
  }

  changeUrlNoRoute(route: any) {
    this.loca.go(`insights/${route}`);
  }
}
