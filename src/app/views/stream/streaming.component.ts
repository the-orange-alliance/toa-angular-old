import { Component } from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

export class StreamType {
  static YOUTUBE = 0;
  static TWITCH = 1;
  static CUSTOM = 2;
}

@Component({
  selector: 'toa-streaming',
  templateUrl: './streaming.component.html',
  providers: [FTCDatabase]
})
export class StreamingComponent {

  private stream: any;
  private safe_url: SafeResourceUrl;

  constructor(private sanitizer:DomSanitizer) {
    this.stream = {
      url: 'https://player.twitch.tv/?channel=taketv',
      // url: 'https://www.youtube.com/embed/AQBh9soLSkI?rel=0',
      type: StreamType.TWITCH,
      event_key: '1617-FIM-CAN'
    };
    this.safe_url = sanitizer.bypassSecurityTrustResourceUrl(this.stream.url);
  }

}
