import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from "../../../../providers/ftc-database";

@Component({
  providers: [FTCDatabase],
  selector: 'event-teams',
  templateUrl: './event-teams.component.html'
})
export class EventTeamsComponent implements OnInit {

  @Input() event: any;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {

  }

  ngOnInit() {

  }

}
