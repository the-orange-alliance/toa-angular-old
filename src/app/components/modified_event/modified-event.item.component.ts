import {Component, Input, OnInit} from '@angular/core';
import ModifiedEvent from '../../models/ModifiedEvent';
import Event from '../../models/Event';

@Component({
  selector: 'toa-modified-event-item',
  templateUrl: './modified-event.item.component.html'
})
export class ModifiedEventItemComponent implements OnInit {

  @Input() modified_event: ModifiedEvent;
  @Input() clickable: boolean = true;
  event: Event;

  ngOnInit(): void {
    this.event = this.modified_event.originalEvent;
  }
}
