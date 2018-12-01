import { Component, OnInit, Input } from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import { TeamSorter } from '../../../../util/team-utils';

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-teams',
  templateUrl: './event-teams.component.html'
})
export class EventTeamsComponent implements OnInit {

  @Input() teams: any;

  ngOnInit() {
    if (this.teams) {
      this.teams = new TeamSorter().sort(this.teams);
    }
  }
}
