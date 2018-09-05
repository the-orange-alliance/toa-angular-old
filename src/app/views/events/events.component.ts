import {Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FTCDatabase } from '../../providers/ftc-database';
import { SeasonParser } from '../../util/season-utils';
import { EventFilter } from '../../util/event-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {MdcTabBar} from '@angular-mdc/web';
import Event from '../../models/Event';
import Season from '../../models/Season';
import Region from '../../models/Region';

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
  weeks: any[];

  currentSeason: Season;
  currentRegion: Region;

  eventFilter: EventFilter;

  @ViewChild('tabbar') tabbar: MdcTabBar;

  constructor(private ftc: FTCDatabase, private router: Router, private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('Events');
  }

  ngOnInit(): void {
    this.ftc.getSeasonEvents('1718').then((data: Event[]) => {
      this.weeks = [];
      this.events = data;
      this.eventFilter = new EventFilter(this.events);
      if (this.events.length > 0) {
        this.organizeEventsByWeek();
      }
    });
    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data;
      this.currentSeason = this.seasons[this.seasons.length - 1];
    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      const allRegions: Region = new Region();
      allRegions.regionKey = "All Regions";
      this.regions = data;
      this.regions.push(allRegions);
      this.currentRegion = this.regions[this.regions.length - 1];
    });
  }

  organizeEventsByWeek(): void {
    this.weeks = [];
    let currentWeek = null;
    for (const event of this.events) {
      if (event.weekKey !== currentWeek) {
        this.weeks.push({
          'week': event.weekKey,
          'startDate': this.getMonday(event.startDate),
          'endDate': this.getSunday(event.endDate)
        });
        currentWeek = event.weekKey;
      }
    }
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

  getEventsByWeek(week: any): Event[] {
    const filteredEvents = [];
    for (const event of this.events) {
      if (event.weekKey === week.week) {
        filteredEvents.push(event);
      }
    }
    return filteredEvents;
  }

  openEvent(eventKey): void {
    this.router.navigate(['/events', eventKey]);
  }

  selectSeason(season: Season) {
    if (this.currentSeason.seasonKey !== season.seasonKey) {
      this.currentSeason = season;
      console.log(this.currentSeason);
      this.ftc.getSeasonEvents(this.currentSeason.seasonKey).then((data: Event[]) => {
        this.weeks = [];
        this.events = data;
        this.eventFilter = new EventFilter(this.events);
        this.currentRegion = this.regions[this.regions.length - 1];
        if (this.events.length > 0) {
          this.organizeEventsByWeek();
        }
      });
    }
  }

  selectRegion(region: Region) {
    if (this.currentRegion.regionKey !== region.regionKey) {
      this.currentRegion = region;
      if (this.currentRegion.description) {
        this.eventFilter.filterArray(this.currentRegion.regionKey);
        this.events = this.eventFilter.getFilteredArray();
      } else {
        this.events = this.eventFilter.getOriginalArray();
      }
      this.organizeEventsByWeek()
    }
  }

  clearFilter() {
    this.currentSeason = this.seasons[this.seasons.length - 1];
    this.currentRegion = this.regions[this.regions.length - 1];
    this.events = this.eventFilter.getOriginalArray();
    this.organizeEventsByWeek()
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
        return 'Week ' + week;
    }
  }

  public select(index) {
    if (this.weeks && this.weeks.length > index) {
      if (this.tabbar) {
        this.tabbar.activateTab(index);
      }
      this.weekNumber = index;
    }
  }

  public isSelected(index): boolean {
    return this.weekNumber === index;
  }
}
