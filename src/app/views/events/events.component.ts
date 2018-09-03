import {Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FTCDatabase } from '../../providers/ftc-database';
import { SeasonParser } from '../../util/season-utils';
import { EventFilter } from '../../util/event-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {MdcTabBar} from '@angular-mdc/web';

@Component({
  providers: [FTCDatabase, TheOrangeAllianceGlobals],
  selector: 'toa-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  seasons: any;
  regions: any;
  events: any;

  view_week: number;
  weeks: any;

  current_season: any;
  current_region: any;

  event_filter: EventFilter;

  @ViewChild('tabbar') tabbar: MdcTabBar;

  constructor(private ftc: FTCDatabase, private router: Router, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('Events');
  }

  ngOnInit(): void {
    this.ftc.getSeasonEvents('1718').subscribe( (data) => {
      this.weeks = [];
      this.events = data;
      this.event_filter = new EventFilter(this.events);
      if (this.events.length > 0) {
        this.organizeEventsByWeek();
      }

    }, (err) => {
      console.log(err);
    });

    this.ftc.getAllSeasons().subscribe( (data) => {
      this.seasons = data;
      this.current_season = this.seasons[this.seasons.length - 1];
    }, (err) => {
      console.log(err);
    });

    this.ftc.getAllRegions().subscribe( (data) => {
      this.regions = data;
      this.regions.push({ region_key: 'All Regions' });
      this.current_region = this.regions[this.regions.length - 1];
    }, (err) => {
      console.log(err);
    });

  }

  organizeEventsByWeek(): void {
    this.weeks = [];
    let cur_week = null;
    for (const event of this.events) {
      if (event.week_key !== cur_week) {
        this.weeks.push({
          'week': event.week_key,
          'start_date': this.getMonday(event.start_date),
          'end_date': this.getSunday(event.start_date)
        });
        cur_week = event.week_key;
      }
    }
    this.select(0);
  }

  getMonday(d) {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getSunday(d) {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() + 6 - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getEventsByWeek(week: any): any {
    const filtered_events = [];
    for (const event of this.events) {
      if (event.week_key === week.week) {
        filtered_events.push(event);
      }
    }
    return filtered_events;
  }

  openEvent(event_key): void {
    this.router.navigate(['/events', event_key]);
  }

  selectSeason(season: any) {
    if (this.current_season.season_key !== season.season_key) {
      this.current_season = season;
      this.ftc.getSeasonEvents(this.current_season.season_key).subscribe( (data) => {
        this.weeks = [];
        this.events = data;
        this.event_filter = new EventFilter(this.events);
        this.current_region = this.regions[this.regions.length - 1];
        if (this.events.length > 0) {
          this.organizeEventsByWeek();
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  selectRegion(region: any) {
    if (this.current_region.region_key !== region.region_key) {
      this.current_region = region;
      if (this.current_region.description) {
        this.event_filter.filterArray(this.current_region.region_key);
        this.events = this.event_filter.getFilteredArray();
      } else {
        this.events = this.event_filter.getOriginalArray();
      }
      this.organizeEventsByWeek()
    }
  }

  getSeason(season_data: any): string {
    return (new SeasonParser(season_data)).toString();
  }

  clearFilter() {
    this.current_season = this.seasons[this.seasons.length - 1];
    this.current_region = this.regions[this.regions.length - 1];
    this.events = this.event_filter.getOriginalArray();
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
      this.view_week = index;
    }
  }

  public isSelected(index): boolean {
    return this.view_week === index;
  }
}
