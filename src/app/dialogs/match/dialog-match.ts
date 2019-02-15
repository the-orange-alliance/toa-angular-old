import { Component, Inject, OnInit } from '@angular/core';
import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FTCDatabase } from '../../providers/ftc-database';
import urlParser from 'js-video-url-parser';
import Match from '../../models/Match';


@Component({
  templateUrl: 'dialog-match.html',
  providers: [FTCDatabase, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class DialogMatch implements OnInit {

  match: Match;
  videoSafeURL: SafeResourceUrl;

  constructor(public dialogRef: MdcDialogRef<DialogMatch>, @Inject(MDC_DIALOG_DATA) data: any, private ftc: FTCDatabase,
              private location: Location, private sanitizer: DomSanitizer) {
    this.match = data.match;
    this.searchVideo();
  }

  ngOnInit() {
    this.ftc.getMatchDetails(this.match.matchKey).then((match: Match) => {
      if (match) {
        this.match = match;
        this.searchVideo()
      }
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.location.back();
    });
    this.location.go(`matches/${this.match.matchKey}`);
  }

  searchVideo() {
    if (this.match && this.match.videoURL) {
      const video = urlParser.parse(this.match.videoURL);
      let embedURL = urlParser.create({
        videoInfo: video,
        params: 'internal',
        format: 'embed'
      });

      if (embedURL) {
        if (embedURL.startsWith('//')) {
          embedURL = 'https:' + embedURL;
        }
        this.videoSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(embedURL);
      }
    }
  }
}
