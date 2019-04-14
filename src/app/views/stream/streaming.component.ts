import { WINDOW } from '@ng-toolkit/universal';
import {Component, HostListener, NgZone, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer } from '@angular/platform-browser';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import EventLiveStream from '../../models/EventLiveStream';
import {isPlatformBrowser} from '@angular/common';

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

  streams: EventLiveStream[];
  layouts: Layout[] = [];
  selectedLayout: number = -1;

  constructor(private router: Router, private ftc: FTCDatabase, private sanitizer: DomSanitizer,
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
    // this.checkSize(this.window.innerWidth); // TODO: Ofek Pleae Fix
    this.ftc.getAllStreams().then((data: EventLiveStream[]) => {
      this.streams = [];
      for (const stream of data) {
        stream.safeURL = this.getSafeURL(stream.streamURL);
        if (stream.isActive) {
          this.streams.push(stream);
        }
      }
    });
  }

  getSafeURL(streamURL): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamURL);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkSize(event.target.innerWidth);
  }

  checkSize(innerWidth: number) {
    if (innerWidth < SMALL_WIDTH_BREAKPOINT) {
      this.selectLayout(4, false);
    } else if (this.selectedLayout < 0) {
      this.layouts = [];
    }
  }

  selectLayout(layoutKey: number, user: boolean = true) {
    this.layouts = this.getLayouts(layoutKey, user)
  }

  getLayouts(layoutKey: number, user: boolean = true): Layout[] {
    if (user) {
      this.selectedLayout = layoutKey;
    }

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
