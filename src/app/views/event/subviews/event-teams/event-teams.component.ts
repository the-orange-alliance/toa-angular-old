import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import { TeamSorter } from '../../../../util/team-utils';

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-teams',
  templateUrl: './event-teams.component.html'
})
export class EventTeamsComponent implements OnInit {

  @Input() teams: any;

  team_sorter: TeamSorter;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {
    this.team_sorter = new TeamSorter();
  }

  ngOnInit() {
    if (this.teams) {
      this.teams = this.team_sorter.sort(this.teams, 0, this.teams.length - 1);
    }
  }

}
