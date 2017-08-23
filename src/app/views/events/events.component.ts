import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FTCDatabase } from "../../providers/ftc-database";
import { SeasonParser } from "../../util/season-utils";
import { EventFilter } from "../../util/event-utils";

@Component({
  providers: [FTCDatabase],
  selector: 'events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  seasons: any;
  regions: any;
  events: any;

  weeks: any;

  current_season: any;
  current_region: any;

  event_filter: EventFilter;

  constructor(private ftc: FTCDatabase, private router: Router) {}

  ngOnInit(): void {
    this.ftc.getSeasonEvents("1617").subscribe( (data) => {
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
      this.current_season = this.seasons[this.seasons.length - 2];
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
    let cur_date = null;
    for (let event of this.events) {
      if (event.start_date != cur_date) {
        this.weeks.push({
          "week": event.week_key,
          "start_date": event.start_date,
          "end_date": event.end_date
        });
        cur_date = event.start_date;
      }
    }
  }

  openEvent(event_key): void {
    this.router.navigate(['/events', event_key]);
  }

  getEventsByWeek(week: any): any {
    let new_events = [];
    for (let event of this.events) {
      if (event.week_key == week.week) {
        new_events.push(event);
      }
    }
    return new_events;
  }

  selectSeason(season: any) {
    if (this.current_season.SeasonID != season.season_key) {
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
    if (this.current_region.region_key != region.region_key) {
      this.current_region = region;
      if (this.current_region.region_desc) {
        this.event_filter.filterArray(this.current_region.region_key);
        this.events = this.event_filter.getFilteredArray();
      } else {
        this.events = this.event_filter.getOriginalArray();
      }
    }
  }

  getSeason(season_data: any): string {
    return (new SeasonParser(season_data)).toString();
  }

}
