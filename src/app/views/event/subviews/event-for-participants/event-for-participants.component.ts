import { Component, OnInit, Input } from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Event from '../../../../models/Event';
import Media from '../../../../models/Media';

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-for-participants',
  templateUrl: './event-for-participants.component.html',
  styleUrls: ['./event-for-participants.component.scss']
})
export class EventForParticipantsComponent implements OnInit{

  @Input() event: Event;
  @Input() media: Media[];

  pitsMap: Media;
  schedule: Media;
  venueMap: Media;

  ngOnInit() {
    if (this.media) {
      for (let media of this.media) {
        if (media.mediaType === 0) {
          this.pitsMap = media;
        } else if (media.mediaType === 1) {
          this.schedule = media;
        } else if (media.mediaType === 2) {
          this.venueMap = media;
        }
      }
    }
  }
}
