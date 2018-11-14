import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Team from "../../../../models/Team";

@Component({
  providers: [FTCDatabase],
  selector: 'toa-team-results',
  templateUrl: './team-results.component.html'
})
export class TeamResultsComponent implements OnInit {

  @Input() team: Team;
  @Input() season: string;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {

  }

  ngOnInit() {

  }

}
