/**
 * Created by Kyle Flynn on 8/27/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import Match from '../../models/Match';
import Event from '../../models/Event';

@Component({
  selector: 'toa-match',
  templateUrl: './matches.component.html',
  providers: [FTCDatabase]
})
export class MatchesComponent implements OnInit {

  noData: boolean;

  matchKey: any;

  match: Match;
  event: Event;

  constructor(private ftc: FTCDatabase, private router: Router, private route: ActivatedRoute) {
    this.matchKey = this.route.snapshot.params['match_key'];
  }

  ngOnInit() {
    this.ftc.getMatchDetails(this.matchKey).then((match: Match) => {
      if (!match) {
        this.noData = true;
      } else {
        this.match = match;
        this.ftc.getEventBasic(match.eventKey).then((event: Event) => {
          this.event = event;
        });
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

}
