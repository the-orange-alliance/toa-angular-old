import { Component, Input, OnInit } from '@angular/core';
import Alliance from '../../../../models/Alliance';

@Component({
  selector: 'toa-event-alliances',
  templateUrl: './event-alliances.component.html',
  styleUrls: ['./event-alliances.component.scss']
})
export class EventAlliancesComponent implements OnInit {

  @Input() alliances: Alliance[];
  showPick2 = false;

  ngOnInit() {
    if (this.alliances) {
      this.showPick2 = this.alliances.every((alliance) => alliance.pick2)
    }
  }
}
