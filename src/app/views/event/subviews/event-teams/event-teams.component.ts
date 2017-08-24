import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from "../../../../providers/ftc-database";
import { TeamSorter } from "../../../../util/team-utils";

@Component({
  providers: [FTCDatabase],
  selector: 'event-teams',
  templateUrl: './event-teams.component.html'
})
export class EventTeamsComponent implements OnInit {

  @Input() event: any;

  team_sorter: TeamSorter;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {
    this.team_sorter = new TeamSorter();
  }

  ngOnInit() {
    if (this.event.teams) {
      this.event.teams = this.team_sorter.sort(this.event.teams, 0, this.event.teams.length - 1);
    }
  }

}
