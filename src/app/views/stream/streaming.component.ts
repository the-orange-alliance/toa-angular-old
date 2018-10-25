import { Component, OnInit } from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer } from '@angular/platform-browser';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {Router} from '@angular/router';
import EventLiveStream from '../../models/EventLiveStream';
import Event from '../../models/Event';
import { SafeResourceUrl } from "@angular/platform-browser/src/security/dom_sanitization_service";

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
  firstupdatesnow: EventLiveStream = new EventLiveStream();

  constructor(private router: Router, private ftc: FTCDatabase, private sanitizer: DomSanitizer, private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('Streaming');
    // Set the FIRST Updates Now stream
    this.firstupdatesnow.eventName = "FIRST Updates Now";
    this.firstupdatesnow.streamURL = "https://player.twitch.tv/?channel=firstupdatesnow";
    this.firstupdatesnow.fullURL = "https://twitch.tv/firstupdatesnow";
    this.firstupdatesnow.safeURL = this.getSafeURL(this.firstupdatesnow.streamURL);
  }

  ngOnInit() {
    this.ftc.getAllStreams().then((data: EventLiveStream[]) => {
      this.streams = [];
      this.streams.push(this.firstupdatesnow);

      for (const stream of data) {
        if (stream.eventKey) {
          this.ftc.getEventBasic(stream.eventKey).then((event: Event) => {
            stream.eventName = event.eventName;
          }, (err) => {
            console.log(err);
          });
        }

        stream.safeURL = this.getSafeURL(stream.streamURL);

        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = stream.streamURL.match(regExp);
        if (match && match[2].length === 11) {
          stream.fullURL = 'https://www.youtube.com/watch?v=' + match[2];
        }

        if (stream.isActive) {
          this.streams.push(stream);
        }
      }
    });
  }

  getSafeURL(streamURL): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamURL);
  }

  openEvent(event_key): void {
    this.router.navigate(['/events', event_key]);
  }
}
