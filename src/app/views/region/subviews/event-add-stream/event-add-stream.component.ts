import { Component, OnInit, Input } from '@angular/core';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import Event from '../../../../models/Event';
import { User } from 'firebase/app';

@Component({
  selector: 'toa-event-add-stream',
  templateUrl: './event-add-stream.component.html',
  styleUrls: ['./event-add-stream.component.css']
})
export class EventAddStreamComponent implements OnInit {

  @Input() user: User;
  @Input() eventKey: string;
  @Input() eventData: Event;

  streamTitle: string;
  streamType: number;
  streamLink: string;

  constructor(
    private cloud: CloudFunctions,
  ) { }

  ngOnInit() {
  }

  sendVideo() {
    
    if (this.streamLink !== "") {

      const requestBody = {
        "event_key": this.eventKey,
        "media_type": this.streamType,
        "primary": false,
        "media_title": this.streamTitle,
        "media_link": this.streamLink
      }

      console.log(requestBody);
      this.cloud.addStream(this.user, requestBody);      
    }
    
  }

}
