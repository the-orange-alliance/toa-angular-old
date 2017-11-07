/**
 * Created by Kyle Flynn on 8/27/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'toa-match',
  templateUrl: './matches.component.html',
  providers: [FTCDatabase]
})
export class MatchesComponent implements OnInit {

  match_key: any;

  match_data: any;
  match_details: any;
  match_stations: any;
  match_event: any;

  constructor(private ftc: FTCDatabase, private router: Router, private route: ActivatedRoute) {
    this.match_key = this.route.snapshot.params['match_key'];
  }

  ngOnInit() {
    const season_split = this.match_key.toString().split('-')[0];
    this.ftc.getMatchDetail(this.match_key).subscribe((match_data) => {
      if (!match_data[0][0]) {
        this.router.navigate(['/not-found']);
      } else {
        this.match_data = match_data[0][0];
        this.match_details = match_data[1][0];
        this.match_stations = match_data[2];

        this.ftc.getEventName(this.match_data.event_key).subscribe((data) => {
          this.match_event = data[0];
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  getMatchSeason(): number {
    let match = this.match_key.substr(0, 4);
    try {
      let match_season = parseInt(match);
      return match_season;
    } catch (e) {
      return 0;
    }
  }

  getStation(station: number): string {
    return this.match_stations[station].team_key;
  }

  getNumberOfTeams() {
    return this.match_stations.length;
  }

}
