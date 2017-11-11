/**
 * Created by Kyle Flynn on 11/9/2017.
 */
import {Component, OnInit} from '@angular/core';
import { FTCDatabase } from '../../../providers/ftc-database';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { StreamType } from "../streaming.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'stream-event',
  templateUrl: './event-stream.component.html',
  providers: [FTCDatabase]
})
export class EventStreamComponent implements OnInit {

  stream: any;
  safe_url: SafeResourceUrl;
  event_key: any;

  constructor(private ftc: FTCDatabase, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.event_key = route.snapshot.params['event_key'];
  }

  ngOnInit() {
    this.ftc.getEventStream(this.event_key).subscribe((data) => {
      this.stream = data;
      this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.stream.stream_url);
    }, (err) => {
      console.log(err);
    });
  }

}
