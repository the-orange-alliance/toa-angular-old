/**
 * Created by Kyle Flynn on 11/7/2017.
 */
import {Component, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Match from '../../../../models/Match';

@Component({
  selector: 'toa-velocity-vortex',
  templateUrl: './1617-velocity-vortex.component.html'
})
export class VelocityVortexComponent {

  @Input() match: Match;

  constructor(private router: Router) {}

  openTeamPage(teamKey: number) {
    this.router.navigate(['/teams', teamKey]);
  }

  openEvent(eventKey: string): void {
    this.router.navigate(['/events', eventKey]);
  }

}
