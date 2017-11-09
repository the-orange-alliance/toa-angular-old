/**
 * Created by Kyle Flynn on 11/9/2017.
 */
import { Component } from '@angular/core';
import { FTCDatabase } from '../../../providers/ftc-database';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { StreamType } from "../streaming.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'stream-event',
  templateUrl: './event-stream.component.html',
  providers: [FTCDatabase]
})
export class EventStreamComponent {

  private stream: any;
  private safe_url: SafeResourceUrl;
  private event_key: any;

  constructor(private sanitizer:DomSanitizer, private route: ActivatedRoute) {
    this.event_key = route.snapshot.params['event_key'];
    this.stream = {
      url: 'https://www.youtube.com/embed/AQBh9soLSkI?rel=0',
      type: StreamType.YOUTUBE,
      event_key: '1617-FIM-CAN'
    };
    this.safe_url = sanitizer.bypassSecurityTrustResourceUrl(this.stream.url);
  }

}
