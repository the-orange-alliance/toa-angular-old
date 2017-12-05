import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { EventParser } from '../../util/event-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  providers: [FTCDatabase,TheOrangeAllianceGlobals],
  selector: 'toa-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {

  event_parser: EventParser;

  event_key: string;
  event: any;
  totalteams: any;
  view_type: string;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private globaltoa:TheOrangeAllianceGlobals) {
    this.event_key = this.route.snapshot.params['event_key'];
    this.event = [];
  }

  ngOnInit() {
    if (this.event_key) {
      this.ftc.getEvent(this.event_key).subscribe((data) => {
        this.event = data[0][0];
        this.event.matches = data[1];
        this.event.matches.stations = data[2];
        this.event.alliances = data[3];
        this.event.rankings = data[4];
        this.event.awards = data[5];
        this.event.teams = data[6];
        this.select('matches');
        this.event_parser = new EventParser(this.event);
        this.totalteams =  this.event.teams.length;
        this.globaltoa.setTitle(this.event.event_name);
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

}
