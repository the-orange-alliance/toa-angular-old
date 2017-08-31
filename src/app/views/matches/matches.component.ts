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

  // auton_fields: any;
  // teleop_fields: any;

  constructor(private ftc: FTCDatabase, private router: Router, private route: ActivatedRoute) {
    this.match_key = this.route.snapshot.params['match_key'];
  }

  ngOnInit() {
    const season_split = this.match_key.toString().split('-')[0];
    this.ftc.getMatchDetail(this.match_key, this.convertSeasonToYear(season_split)).subscribe((match_data) => {
      if (!match_data[0][0]) {
        this.router.navigate(['/not-found']);
      } else {
        this.match_data = match_data[0][0];
        this.match_details = match_data[1][0];
        this.match_stations = match_data[2];

        // this.auton_fields = this.getAutonFields(this.match_details);
        // this.teleop_fields = this.getTeleopFields(this.match_details);

        this.ftc.getEventName(this.match_data.event_key).subscribe((data) => {
          this.match_event = data[0];
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  // getAutonFields(match_details: any) {
  //   let fields = Object.keys(match_details);
  //   let auto_fields = [];
  //   for (let i = 0; i < fields.length; i++) {
  //     let key = fields[i];
  //     if (key.indexOf('auto') > -1) {
  //       let team = key.split('_')[0];
  //       auto_fields.push({
  //         name: key,
  //         value: match_details[key],
  //         alliance: team
  //       });
  //     }
  //   }
  //   return auto_fields;
  // }
  //
  // getTeleopFields(match_details: any) {
  //   let fields = Object.keys(match_details);
  //   let tele_fields = [];
  //   for (let i = 0; i < fields.length; i++) {
  //     let key = fields[i];
  //     if (key.indexOf('driver') > -1) {
  //       tele_fields.push({
  //         name: key,
  //         value: match_details[key]
  //       });
  //     }
  //   }
  //   return tele_fields;
  // }

  convertSeasonToYear(season: string): number {
    let year = 2017;
    switch (season) {
      case '1617':
        year = 2017;
        break;
    }
    return year;
  }

  getStation(station: number): string {
    return this.match_stations[station].team_key;
  }

  openTeamPage(team: any) {
    this.router.navigate(['/teams', team]);
  }

  openEvent(event_key): void {
    this.router.navigate(['/events', event_key]);
  }

  getNumberOfTeams() {
    return this.match_stations.length;
  }

}
