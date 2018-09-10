import { Component, Input } from '@angular/core';
import Event from '../../models/Event';

@Component({
  selector: 'toa-event-item',
  templateUrl: './event.item.component.html'
})
export class EventItemComponent {
  @Input() event: Event;
}
