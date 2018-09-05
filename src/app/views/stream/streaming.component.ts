import { Component, OnInit } from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer } from '@angular/platform-browser';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {Router} from '@angular/router';

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

  streams: any[];

  constructor(private router: Router, private ftc: FTCDatabase, private sanitizer: DomSanitizer, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('Streaming');
  }

  ngOnInit() {
    this.ftc.getAllStreams().then((data: any[]) => {
      this.streams = data;

      for (const stream of this.streams) {
        stream.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(stream.stream_url);

        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = stream.stream_url.match(regExp);
        if (match && match[2].length === 11) {
          stream.full_url = 'https://www.youtube.com/watch?v=' + match[2];
        } else {
          console.clear();
          console.log(match)
        }
      }
      console.log(this.streams);
    }, (err) => {
      console.log(err);
    });
  }

  openEvent(event_key): void {
    this.router.navigate(['/events', event_key]);
  }
}
