import {Component, Input, OnInit} from '@angular/core';
import ModifiedEvent from '../../models/ModifiedEvent';
import Event from '../../models/Event';
import { CloudFunctions } from '../../providers/cloud-functions';
import User from '../../models/User';

@Component({
  selector: 'toa-modified-event-item',
  templateUrl: './modified-event.item.component.html',
  styleUrls: ['./modified-event.item.component.scss']
})
export class ModifiedEventItemComponent implements OnInit {

  @Input() modifiedEvent: ModifiedEvent;
  @Input() user: User;

  originalEvent: Event;
  newEvent: Event;
  isHidden: boolean;
  constructor (public cloud: CloudFunctions) { }

  ngOnInit(): void {
    this.originalEvent = this.modifiedEvent.originalEvent;
    this.newEvent = this.modifiedEvent.newEvent;
  }

  updateEvent(): void {
    this.cloud.updateEvent(this.user.firebaseUser, this.originalEvent.eventKey, this.newEvent.toJSON()).then((data) => {
      this.isHidden = true;
    }).catch(console.error);
  }
}
