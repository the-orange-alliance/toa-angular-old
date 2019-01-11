import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import urlParser from 'js-video-url-parser';
import { DomSanitizer } from '@angular/platform-browser';
import Match from '../../models/Match';
import Event from '../../models/Event';

@Component({
  selector: 'toa-match',
  templateUrl: './matches.component.html',
  providers: [FTCDatabase]
})
export class MatchesComponent implements OnInit {

  matchKey: any;

  match: Match;
  videoSafeURL: SafeResourceUrl;

  constructor(private ftc: FTCDatabase, private router: Router, private sanitizer: DomSanitizer, private route: ActivatedRoute, private app: TheOrangeAllianceGlobals) {
    this.matchKey = this.route.snapshot.params['match_key'];
  }

  ngOnInit() {
    this.ftc.getMatchDetails(this.matchKey).then((match: Match) => {
      if (match) {
        this.match = match;
        if (match.videoURL != null) {
          const video = urlParser.parse(match.videoURL);
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

        this.ftc.getEventBasic(match.eventKey).then((event: Event) => {
          this.match.event = event;
          this.app.setTitle(this.match.matchName + ' - ' + this.match.event.eventName);
          this.app.setDescription(`Match results ${ this.match.videoURL ? 'and video ' : '' }for ${ this.match.matchName } at the ${ this.match.event.eventName } FIRST Tech Challenge`);
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  getMatchSeason(): number {
    const match = this.matchKey.substr(0, 4);
    try {
      const seasonKey = parseInt(match);
      return seasonKey;
    } catch (e) {
      return 0;
    }
  }

  sendAnalytic(category, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: this.router.url,
      eventAction: action,
      eventValue: 10
    });
  }
}
