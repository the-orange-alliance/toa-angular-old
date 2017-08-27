import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';

@Component({
  providers: [FTCDatabase],
  selector: 'event-awards',
  templateUrl: './event-awards.component.html'
})
export class EventAwardsComponent implements OnInit {

  @Input() event: any;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {

  }

  ngOnInit() {

  }

}
