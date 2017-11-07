/**
 * Created by Kyle Flynn on 11/7/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';

@Component({
  selector: 'velocity-vortex',
  templateUrl: './1617-velocity-vortex.component.html',
  providers: [FTCDatabase]
})
export class VelocityVortexComponent implements OnInit {

  @Input() match_data: any;
  @Input() match_details: any;
  @Input() match_stations: any;

  constructor(private ftc: FTCDatabase, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

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
