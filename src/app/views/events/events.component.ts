import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../app-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { EventFilter, EventSorter } from '../../util/event-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {MdcSelect, MdcTabBar} from '@angular-mdc/web';
import Event from '../../models/Event';
import Season from '../../models/Season';
import Region from '../../models/Region';
import Week from '../../models/Week';
import {Location} from '@angular/common';

@Component({
  providers: [FTCDatabase, TheOrangeAllianceGlobals],
  selector: 'toa-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  seasons: Season[];
  regions: Region[];
  events: Event[];

  weekNumber: number;
  weeks: Map<string, Week>;
  availableWeeks: Week[];

  currentSeason: Season = null;
  currentRegion: Region;

  paramSeason: string;
  paramRegion: string;

  eventFilter: EventFilter;

  @ViewChild('tabbar', {static: false}) tabbar: MdcTabBar;
  @ViewChild('current_region', {static: false}) regionSelector: MdcSelect;
  @ViewChild('current_season', {static: false}) seasonSelector: MdcSelect;

  constructor(private ftc: FTCDatabase, private router: Router, private app: TheOrangeAllianceGlobals,
              private translate: TranslateService, private appBarService: AppBarService, private route: ActivatedRoute,
              private loca: Location, ) {
    this.app.setTitle('Events');
    this.app.setDescription(`List of FIRST Tech Challenge events`);
    this.weeks = new Map<string, Week>();
    this.paramRegion = this.route.snapshot.queryParamMap.get('region');
    this.paramSeason = this.route.snapshot.queryParamMap.get('season');
  }

  ngOnInit(): void {
    this.translate.get('general.events').subscribe((str: string) => {
      this.appBarService.setTitle(str);
    });

    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data.reverse();
      if (!this.paramSeason) {
        this.selectSeason(this.getCurrentSeason());
      } else {
        this.selectSeason(this.seasonStringToSeason(this.paramSeason));
      }
    });

    this.ftc.getAllRegions().then((data: Region[]) => {
      const allRegions: Region = new Region();
      allRegions.regionKey = 'All Regions';
      this.regions = [
        allRegions,
        ...data
      ];
      if (!this.paramRegion) {
        this.currentRegion  = allRegions;
      } else {
        this.currentRegion = this.regionStringToRegion(this.paramRegion);
      }
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

  regionStringToRegion(region: string): Region {
    for (const r of this.regions) {
      if (r.regionKey === region) {
        return r;
      }
    }
    return this.regions[0];
  }

  organizeEventsByWeek(): void {
    this.weeks.clear();
    for (const event of this.events) {
      if (this.weeks.get(event.weekKey) === undefined) {
        this.weeks.set(event.weekKey, {
          weekKey: event.weekKey,
          startDate: event.startDate,
          endDate: event.endDate
        });
      } else {
        this.weeks.get(event.weekKey).endDate = event.endDate;
      }
    }
    this.availableWeeks = Array.from(this.weeks.values());
    this.select(0);
  }

  getMonday(d: any): Date {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getSunday(d: any): Date {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() + 6 - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getEventsByWeek(week: Week): Event[] {
    const filteredEvents = [];
    for (const event of this.events) {
      if (event.weekKey === week.weekKey) {
        filteredEvents.push(event);
      }
    }
    return filteredEvents;
  }

  onSeasonChange(event: {index: any, value: any}) {
    event.index = (event.index < 0) ? 0 : event.index;
    this.selectSeason(this.seasons[event.index]);
    // Update URL Parameter
    this.updateQueryParam();
  }

  selectSeason(season: Season) {
    if (this.currentSeason === null || this.currentSeason.seasonKey !== season.seasonKey) {
      this.currentSeason = season;
      return this.ftc.getSeasonEvents(this.currentSeason.seasonKey).then((data: Event[]) => {
        this.events = new EventSorter().sort(data);
        this.eventFilter = new EventFilter(this.events);
        this.selectRegion(this.currentRegion)
      }).catch(() => {
        this.events = [];
        this.eventFilter = new EventFilter(this.events);
        this.selectRegion(this.currentRegion)
      });
    }
    return null;
  }

  onRegionChange (event: {index: any, value: any}) {
    event.index = (event.index < 0) ? 0 : event.index;
    this.selectRegion(this.regions[event.index]);
    this.updateQueryParam();
  }

  selectRegion(region: Region) {
    this.currentRegion = region;
    if (this.currentRegion !== undefined && this.currentRegion.description) {
      this.eventFilter.filterArray(this.currentRegion.regionKey);
      this.events = this.eventFilter.getFilteredArray();
    } else if (this.eventFilter !== undefined) {
      this.events = this.eventFilter.getOriginalArray();
    }
    this.events = new EventSorter().sort(this.events);
    this.organizeEventsByWeek();
  }

  clearFilter() {
    this.currentRegion = this.regions[0];

    const defaultSeason = this.getCurrentSeason();
    if (defaultSeason.seasonKey === this.currentSeason.seasonKey) {
      this.currentSeason = defaultSeason;
      this.events = this.eventFilter.getOriginalArray();
      this.organizeEventsByWeek();
    } else {
      this.selectSeason(defaultSeason);
    }
  }

  getCurrentSeason(): Season {
    for (const season of this.seasons) {
      if (season.seasonKey === this.ftc.year) {
        return season;
      }
    }
    return null;
  }

  public getWeekName(week): string {
    switch (week) {
      case 'CMP':
        return 'FIRST Championship';
      case 'CMPHOU':
        return 'FIRST Championship - Houston';
      case 'CMPSTL':
        return 'FIRST Championship - St. Louis';
      case 'CMPDET':
        return 'FIRST Championship - Detroit';
      case 'ESR':
        return 'East Super Regional Championship';
      case 'NSR':
        return 'North Super Regional Championship';
      case 'SSR':
        return 'South Super Regional Championship';
      case 'WSR':
        return 'West Super Regional Championship';
      case 'SPR':
        return 'Super Regionals';
      case 'FOC':
        return 'Festival of Champions';
      default:
        if (week.match('-?\\d+(\\.\\d+)?')) { // match a number with optional '-' and decimal.
          return 'Week ' + week;
        } else {
          return week;
        }
    }
  }

  public select(index) {
    if (this.weeks && this.weeks.size > index) {
      if (this.tabbar) {
        this.tabbar.activateTab(index);
      }
      this.weekNumber = index;
    }
  }

  public isSelected(index): boolean {
    return this.weekNumber === index;
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

  changeUrlNoRoute(route: any) {
    this.loca.go(route);
  }

  updateQueryParam() {
    const regionToSet = (this.currentRegion.regionKey === 'All Regions') ? undefined : this.currentRegion.regionKey;
    const urlTree = this.router.createUrlTree([], {
      queryParams: {season: this.currentSeason.seasonKey,
                    region: regionToSet},
      queryParamsHandling: 'merge',
      preserveFragment: true });

    this.changeUrlNoRoute(urlTree.toString())
  }

  getRegionString(regionKey: string, description?: string) {
    if (description) {
      return regionKey + ' - ' + description;
    } else {
      return regionKey;
    }
  }
}
