import {Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FTCDatabase } from '../../providers/ftc-database';
import { EventFilter, EventSorter } from '../../util/event-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { MdcTabBar } from '@angular-mdc/web';
import Event from '../../models/Event';
import Season from '../../models/Season';
import Region from '../../models/Region';
import Week from '../../models/Week';

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

  currentSeason: Season;
  currentRegion: Region;

  eventFilter: EventFilter;
  eventSorter: EventSorter;

  @ViewChild('tabbar') tabbar: MdcTabBar;

  constructor(private ftc: FTCDatabase, private router: Router, private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('Events');
    this.weeks = new Map<string, Week>();
  }

  ngOnInit(): void {
    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data.reverse();
      this.currentSeason = this.seasons[0];

      this.ftc.getSeasonEvents(this.currentSeason.seasonKey).then((data: Event[]) => {
        this.events = data;
        this.eventFilter = new EventFilter(this.events);
        this.eventSorter = new EventSorter();
        this.events = this.eventSorter.sort(this.events, 0, this.events.length - 1);
        if (this.events.length > 0) {
          this.organizeEventsByWeek();
        }
      });

    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      const allRegions: Region = new Region();
      allRegions.regionKey = 'All Regions';
      this.regions = data;
      this.regions.push(allRegions);
      this.currentRegion = this.regions[this.regions.length - 1];
    });
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

  openEvent(eventKey): void {
    this.router.navigate(['/events', eventKey]);
  }

  selectSeason(season: Season) {
    if (this.currentSeason.seasonKey !== season.seasonKey) {
      this.currentSeason = season;
      this.ftc.getSeasonEvents(this.currentSeason.seasonKey).then((data: Event[]) => {
        this.events = data;
        this.eventFilter = new EventFilter(this.events);
        this.events = this.eventSorter.sort(this.events, 0, this.events.length - 1);
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
      this.organizeEventsByWeek();
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
        if (week.match("-?\\d+(\\.\\d+)?")) { // match a number with optional '-' and decimal.
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
}
