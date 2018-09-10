import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { EventParser } from '../../util/event-utils';
import { MatchSorter, MatchType } from '../../util/match-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import Event from '../../models/Event';
import EventType from '../../models/EventType';
import Season from '../../models/Season';
import Region from '../../models/Region';

@Component({
  providers: [FTCDatabase, TheOrangeAllianceGlobals],
  selector: 'toa-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event_parser: EventParser;
  match_sorter: MatchSorter;

  regions: any;
  seasons: any;
  event_types: any;

  event_key: string;
  event: Event;
  event_type_name: string;
  event_season_name: string;
  totalteams: any;
  totalmatches: any;
  totalrankings: any;
  totalawards: any;
  view_type: string;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals) {
    this.event_key = this.route.snapshot.params['event_key'];
  }

  ngOnInit() {
    if (this.event_key) {
      this.ftc.getEvent(this.event_key).then((data: Event) => {
        if (data) {
          this.event = data;

          this.app.setTitle(this.event.eventName);

          if (this.event.rankings && this.event.rankings.length > 0) {
            this.select('rankings');
          } else if (this.event.matches && this.event.matches.length > 0) {
            this.select('matches')
          } else {
            this.select('teams');
          }

          if (this.event.matches) {
            this.match_sorter = new MatchSorter();
            this.event.matches = this.match_sorter.sort(this.event.matches, 0, this.event.matches.length - 1);
          }

          this.event_parser = new EventParser(this.event);
          this.totalteams = this.event.teams.length;
          this.totalmatches = this.event.matches.length;
          this.totalrankings = this.event.rankings.length;
          this.totalawards = this.event.awards.length;

          this.ftc.getEventTypes().then((types: EventType[]) => {
            this.event_types = types;
            const typeObj = this.event_types.filter(obj => obj.eventTypeKey === this.event.eventTypeKey);
            if (typeObj && typeObj[0] && typeObj[0].description) {
              this.event_type_name = typeObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });

          this.ftc.getAllSeasons().then((seasons: Season[]) => {
            this.seasons = seasons;
            const seasonObj = this.seasons.filter(obj => obj.seasonKey === this.event.seasonKey);
            if (seasonObj && seasonObj.length === 1 && seasonObj[0] && seasonObj[0].description) {
              this.event_season_name = seasonObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });
        } else {
          this.router.navigate(['/not-found']);
        }
      }, (err) => {
        console.log(err);
      });

      this.ftc.getAllRegions().then((data: Region[]) => {
        this.regions = data;
      }, (err) => {
        console.log(err);
      });
    }
  }

  public select(view_type) {
    this.view_type = view_type;
  }

  public isSelected(view_type): boolean {
    return this.view_type === view_type;
  }

  fixCountry(country) {
    const region = this.regions.filter(obj => obj.regionKey === country);

    if (region.length === 1 && region[0].description && country.toUpperCase() !== 'USA') {
      return region[0].description
    } else {
      return country;
    }
  }
}
