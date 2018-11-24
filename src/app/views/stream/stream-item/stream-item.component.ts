import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import EventLiveStream from "../../../models/EventLiveStream";

@Component({
  selector: 'toa-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.scss']
})
export class StreamItemComponent implements OnInit {

  @Input() id: number;
  @Input() height: string;

  @Input() streams: EventLiveStream[];
  stream: EventLiveStream = null;
  selectedStreamKey: string = "";

  constructor(public router: Router) {

  }

  ngOnInit() {

  }

  openEvent(event_key): void {
    this.router.navigate(['/events', event_key]);
  }

  getStream(streamKey: string): EventLiveStream {
    for (let stream of this.streams) {
      if (stream.streamKey === streamKey) {
        return stream;
      }
    }
    return null;
  }
}
