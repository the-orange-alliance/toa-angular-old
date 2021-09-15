import {ApplicationRef, Component, OnInit} from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AppBarService } from '../../app-bar.service';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import Season from '../../models/Season';
import Region from '../../models/Region';

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
  regions: Region[] = [];
  currentSeason: Season = null;
  currentRegion: Region = null;

  activeTab = 0;

  constructor(private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals, protected sanitizer: DomSanitizer,
              private loca: Location, private router: Router, private appBarService: AppBarService, private appRef: ApplicationRef) {
    this.app.setTitle('Insights');
  }

  ngOnInit(): void {
    this.appBarService.setTitle('Insights');

    if (this.router.url.indexOf('/insights/quals') > -1) {
      this.activeTab = 0;
      this.loadQualsMTFirst();
    } else if (this.router.url.indexOf('/insights/elims') > -1) {
      this.activeTab = 1;
      this.loadElimsMTFirst();
    } else if (this.router.url.indexOf('/insights/stquals') > -1) {
      this.activeTab = 2;
      this.loadQualsSTFirst();
    } else if (this.router.url.indexOf('/insights/combined') > -1) {
      this.activeTab = 3;
      this.loadCombinedFirst();
    } else {
      this.changeUrlNoRoute('quals');
      this.loadQualsMTFirst();
    }

    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data.reverse();
      this.selectSeason(this.getCurrentSeason());
    });

    this.ftc.getAllRegions().then((data: Region[]) => {
      const allRegions: Region = new Region();
      allRegions.regionKey = 'All Regions';
      this.regions = [
        allRegions,
        ...data
      ];
      this.selectRegion(this.regions[0])
    });
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
      this.currentSeason = season;
      if (this.activeTab > 1) {
        this.activeTab = 0;
      }
      this.refreshEvents();
    }
  }

  refreshEvents() {
    this.insightsQuals = undefined;
    this.insightsElims = undefined;
    this.insightsSingle = undefined;
    this.insightsCombo = undefined;

    this.ftc.getInsights(this.currentSeason.seasonKey, 'quals', 'excluded', this.currentRegion.regionKey).then((data: any) => {
      this.insightsQuals = data;
    }).catch(() => {});

    this.ftc.getInsights(this.currentSeason.seasonKey, 'elims', 'excluded', this.currentRegion.regionKey).then((data: any) => {
      this.insightsElims = data;
    }).catch(() => {});

    if (this.currentSeason.seasonKey === '2021') {
      this.ftc.getInsights(this.currentSeason.seasonKey, 'quals', 'only', this.currentRegion.regionKey).then((data: any) => {
        this.insightsSingle = data;
      }).catch(() => {});

      this.ftc.getInsights(this.currentSeason.seasonKey, 'quals', 'included', this.currentRegion.regionKey).then((data: any) => {
        this.insightsCombo = data;
      }).catch(() => {});
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

  onRegionChange (event: {index: any, value: any}) {
    event.index = (event.index < 0) ? 0 : event.index;
    this.selectRegion(this.regions[event.index]);
  }

  selectRegion(region: Region) {
    this.currentRegion = region;
    this.refreshEvents();
  }

  getRegionString(regionKey: string, description?: string) {
    if (description) {
      return regionKey + ' - ' + description;
    } else {
      return regionKey;
    }
  }

  regionStringToRegion(region: string): Region {
    for (const r of this.regions) {
      if (r.regionKey === region) {
        return r;
      }
    }
    return this.regions[0];
  }

  clearFilter() {
    this.currentRegion = this.regions[0];
    this.currentSeason = this.seasons[0];
    this.refreshEvents();
  }

  onTab(event) {
    this.activeTab = event.index;
  }

  changeUrlNoRoute(route: any) {
    this.loca.go(`insights/${route}`);
  }

  loadQualsMTFirst() {
    this.ftc.getInsights(2021, 'quals', 'excluded', 'All Regions').then(data => {
      this.insightsQuals = data;
      return this.ftc.getInsights(2021, 'elims', 'excluded', 'All Regions')
    }).then(data => {
      this.insightsElims = data;
      return this.ftc.getInsights(2021, 'quals', 'only', 'All Regions');
    }).then(data => {
      this.insightsSingle = data;
      return this.ftc.getInsights(2021, 'quals', 'included', 'All Regions')
    }).then(data => {
      this.insightsCombo = data;
    });
  }

  loadElimsMTFirst() {
    this.ftc.getInsights(2021, 'elims', 'excluded', 'All Regions').then(data => {
      this.insightsQuals = data;
      return this.ftc.getInsights(2021, 'quals', 'excluded', 'All Regions')
    }).then(data => {
      this.insightsElims = data;
      return this.ftc.getInsights(2021, 'quals', 'only', 'All Regions');
    }).then(data => {
      this.insightsSingle = data;
      return this.ftc.getInsights(2021, 'quals', 'included', 'All Regions')
    }).then(data => {
      this.insightsCombo = data;
    });
  }

  loadQualsSTFirst() {
    this.ftc.getInsights(2021, 'quals', 'only', 'All Regions').then(data => {
      this.insightsQuals = data;
      return this.ftc.getInsights(2021, 'quals', 'excluded', 'All Regions')
    }).then(data => {
      this.insightsElims = data;
      return this.ftc.getInsights(2021, 'elims', 'excluded', 'All Regions');
    }).then(data => {
      this.insightsSingle = data;
      return this.ftc.getInsights(2021, 'quals', 'included', 'All Regions')
    }).then(data => {
      this.insightsCombo = data;
    });
  }

  loadCombinedFirst() {
    this.ftc.getInsights(2021, 'quals', 'included', 'All Regions').then(data => {
      this.insightsQuals = data;
      return this.ftc.getInsights(2021, 'quals', 'excluded', 'All Regions')
    }).then(data => {
      this.insightsElims = data;
      return this.ftc.getInsights(2021, 'elims', 'excluded', 'All Regions');
    }).then(data => {
      this.insightsSingle = data;
      return this.ftc.getInsights(2021, 'quals', 'only', 'All Regions');
    }).then(data => {
      this.insightsCombo = data;
    });
  }
}
