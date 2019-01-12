import { Component, OnInit } from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer } from '@angular/platform-browser';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import EventLiveStream from '../../models/EventLiveStream';

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
    this.app.setDescription('Watch live FIRST Tech Challenge events')
  }

  ngOnInit() {
    this.ftc.getAllStreams().then((data: EventLiveStream[]) => {
      this.streams = [];

      for (const stream of data) {

        stream.safeURL = this.getSafeURL(stream.streamURL);
        stream.fullURL = this.getFullURL(stream.streamURL);

        if (stream.isActive) {
          this.streams.push(stream);
        }
      }
    });
  }

  getSafeURL(streamURL): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamURL);
  }

  getFullURL(streamURL: string) {
    // YouTube
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = streamURL.match(regExp);
    if (match && match[2].length === 11) {
       return 'https://www.youtube.com/watch?v=' + match[2];
    }

    // Twitch
    regExp = /^.*(twitch\.tv(|\/|)\?channel=|\&channel=)([^#\&\?]*).*/;
    match = streamURL.match(regExp);
    if (match && match[2]) {
      return 'https://twitch.tv/' + match[2];
    }

    return null
  }

}
