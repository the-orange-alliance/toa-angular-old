import { Component, OnInit } from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer } from '@angular/platform-browser';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {Router} from '@angular/router';
import EventLiveStream from '../../models/EventLiveStream';
import Event from '../../models/Event';

export class StreamType {
  static YOUTUBE = 0;
  static TWITCH = 1;
  static CUSTOM = 2;
}

@Component({
  selector: 'toa-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class StreamingComponent implements OnInit {

  streams: EventLiveStream[];

  constructor(private router: Router, private ftc: FTCDatabase, private sanitizer: DomSanitizer, private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('Streaming');
  }

  ngOnInit() {
    this.ftc.getAllStreams().then((data: EventLiveStream[]) => {
      this.streams = data;

      for (const stream of this.streams) {
        this.ftc.getEventBasic(stream.eventKey).then((event: Event) => {
          stream.eventName = event.eventName;
        }, (err) => {
          console.log(err);
        });

        stream.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(stream.streamURL);

        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = stream.streamURL.match(regExp);
        if (match && match[2].length === 11) {
          stream.streamURL = 'https://www.youtube.com/watch?v=' + match[2];
        }
      }
    });
  }

  openEvent(event_key): void {
    this.router.navigate(['/events', event_key]);
  }
}
