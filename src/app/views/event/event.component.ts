import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { EventParser } from '../../util/event-utils';
import { MatchSorter, MatchType } from '../../util/match-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';

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

  event_key: string;
  event: any;
  event_type_name: string;
  totalteams: any;
  totalmatches: any;
  totalrankings: any;
  totalawards: any;
  view_type: string;


  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private globaltoa: TheOrangeAllianceGlobals) {
    this.event_key = this.route.snapshot.params['event_key'];
    this.event = [];
  }

  ngOnInit() {
    if (this.event_key) {
      this.ftc.getEvent(this.event_key).subscribe((data) => {

        if (data[0].length !== 0) {
          this.event = data[0][0];
          this.event.matches = data[1];
          this.event.matches.stations = data[2];
          this.event.alliances = data[3];
          this.event.rankings = data[4];
          this.event.awards = data[5];
          this.event.teams = data[6];

          this.globaltoa.setTitle(this.event.event_name);

          if (this.event.rankings.length > 0) {
            this.select('rankings');
          } else if (this.event.matches.length > 0) {
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

          this.ftc.getEventTypes().subscribe((types) => {
            const typeObj = types.filter(obj => obj.event_type_key === this.event.event_type_key);
            if (typeObj && typeObj[0] && typeObj[0].description) {
              this.event_type_name = typeObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });
        } else {
          // TODO: Event not found
        }

      }, (err) => {
        console.log(err);
      });

      this.ftc.getAllRegions().subscribe( (data) => {
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
    const region = this.regions.filter(obj => obj.region_key === country);

    if (region[0] && country.toUpperCase() !== 'USA') {
      return region[0].description
    } else {
      return country;
    }
  }
}
