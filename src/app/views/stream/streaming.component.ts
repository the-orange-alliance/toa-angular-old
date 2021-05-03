import {Component, HostListener, NgZone, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { isPlatformBrowser, Location } from '@angular/common';
import { MdcCheckboxChange } from '@angular-mdc/web';
import EventLiveStream from '../../models/EventLiveStream';

export class Layout {
  width: number;
  height: number;
  top: number;
  left: number;

  constructor(width: number, height: number, top: number, left: number) {
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
  }

  getStyle(): any {
    return {
      width: this.width > 0 ? this.width + '%' : 0,
      height: this.height > 0 ? this.height + '%' : 0,
      top: this.top > 0 ? this.top + '%' : 0,
      left: this.left > 0 ? this.left + '%' : 0,
      position: 'absolute',
    }
  }
}

const SMALL_WIDTH_BREAKPOINT = 700;

@Component({
  selector: 'toa-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class StreamingComponent implements OnInit {

  mainStream: EventLiveStream = null;
  streams: EventLiveStream[];
  layouts: Layout[] = [];
  selectedLayout = -1;
  currentlyLayout = -1;
  showChat = true;

  constructor(private router: Router, private ftc: FTCDatabase, private sanitizer: DomSanitizer, private loca: Location,
              private app: TheOrangeAllianceGlobals, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {
    this.app.setTitle('Streaming');
    this.app.setDescription('Watch live FIRST Tech Challenge events');

    if (isPlatformBrowser(this.platformId)) {
      window.onresize = (e) => {
        this.ngZone.run(() => {
          this.checkSize(window.innerWidth);
        });
      };
    }
  }

  ngOnInit() {
    const event = new URL(window.location.href).searchParams.get('e');
    const kickoff = new URL(window.location.href).searchParams.get('kickoff') === '';
    this.loca.go('/stream'); // Remove query parameters
    this.checkSize(window.innerWidth); // TODO: Fix for SSR
    this.ftc.getAllStreams().then((data: EventLiveStream[]) => {
      this.streams = [];
      for (const stream of data) {
        stream.safeURL = this.getSafeURL(stream.streamURL);
        if (stream.isActive) {
          this.streams.push(stream);
          if (kickoff && stream.streamKey.toLowerCase() === 'kickoff') {
            this.mainStream = stream;
            this.selectLayout(0);
          } else if (stream.eventKey && event && (stream.eventKey.toUpperCase() === `${this.ftc.year}-${event}`.toUpperCase() ||
            stream.eventKey.toUpperCase() === event.toUpperCase())) {
            this.mainStream = stream;
            this.selectLayout(0);
          }
        }
      }
      this.streams.sort(function(a,b) {
        return (a.startDateTime < b.startDateTime) ? -1 : ((a.startDateTime > b.startDateTime) ? 1 : 0)
      });
    });
  }

  getSafeURL(streamURL): SafeResourceUrl {
    // TWICH EMBEDS WILL NOT WORK ON DEV SIDE DUE TO TWITCH'S EMBED PARAMETERS
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamURL + '&parent=theorangealliance.org'); // &parent=theorangealliance.org is for twitch embeds
  }                                                                                                          // set to 'localhost' to test on dev site

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkSize(event.target.innerWidth);
  }

  onChatChange(event: MdcCheckboxChange) {
    this.showChat = event.checked;
  }

  checkSize(innerWidth: number) {
    if (this.currentlyLayout !== 4 && this.currentlyLayout !== 0 && innerWidth < SMALL_WIDTH_BREAKPOINT) {
      this.selectLayout(4, false);
    } else if (innerWidth >= SMALL_WIDTH_BREAKPOINT && this.selectedLayout < 0) {
      this.layouts = [];
      this.currentlyLayout = -1;
    }
  }

  selectLayout(layoutKey: number, user: boolean = true) {
    this.layouts = this.getLayouts(layoutKey, user)
  }

  unselectLayout() {
    this.layouts = [];
    this.selectedLayout = -1;
    this.currentlyLayout = -1;
  }

  getLayouts(layoutKey: number, user: boolean = true): Layout[] {
    if (user) {
      this.selectedLayout = layoutKey;
    }
    this.currentlyLayout = layoutKey;

    // The layouts, names, and icons were taken from TBA
    // https://github.com/the-blue-alliance/the-blue-alliance/blob/master/react/gameday2/constants/LayoutConstants.js
    const layouts: Layout[] = [];
    if (layoutKey === 0) {
      /*
        +------+------+
        |             |
        |      0      |
        |             |
        +------+------+
      */
      layouts.push(new Layout(100, 100, 0, 0));

    } else if (layoutKey === 1) {
      /*
        +------+------+
        |      |      |
        |   0  |   1  |
        |      |      |
        +------+------+
      */
      layouts.push(new Layout(50, 100, 0, 0));
      layouts.push(new Layout(50, 100, 0, 50));

    } else if (layoutKey === 2) {
      /*
        +-------+-----+
        |       |  1  |
        |   0   |-----|
        |       |  2  |
        +-------+-----+
      */
      layouts.push(new Layout(70, 100, 0, 0));
      layouts.push(new Layout(30, 50, 0, 70));
      layouts.push(new Layout(30, 50, 50, 70));

    } else if (layoutKey === 3) {
      /*
        +------+------+
        |   0  |   1  |
        |------|------|
        |   2  |   3  |
        +------+------+
      */
      layouts.push(new Layout(50, 50, 0, 0));
      layouts.push(new Layout(50, 50, 0, 50));
      layouts.push(new Layout(50, 50, 50, 0));
      layouts.push(new Layout(50, 50, 50, 50));

    } else if (layoutKey === 4) {
      /*
       +-------------+
       |      0      |
       |-------------|
       |      1      |
       +-------------+
      */
      layouts.push(new Layout(100, 50, 0, 0));
      layouts.push(new Layout(100, 50, 50, 0));

    } else if (layoutKey === 5) {
      /*
        +-----------+-----+
        |           |  1  |
        |           |-----|
        |           |  2  |
        |      0    |-----|
        |           |  3  |
        |           |-----|
        |           |  4  |
        +-----------+-----+
      */
      layouts.push(new Layout(75, 100, 0, 0));
      layouts.push(new Layout(25, 25, 0, 75));
      layouts.push(new Layout(25, 25, 25, 75));
      layouts.push(new Layout(25, 25, 50, 75));
      layouts.push(new Layout(25, 25, 75, 75));
    }
    return layouts;
  }
}
