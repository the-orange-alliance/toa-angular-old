import { Component, Input } from '@angular/core';
import Alliance from '../../../../models/Alliance';

@Component({
  selector: 'toa-event-alliances',
  templateUrl: './event-alliances.component.html',
  styleUrls: ['./event-alliances.component.scss']
})
export class EventAlliancesComponent {

  @Input() alliances: Alliance[];

}
