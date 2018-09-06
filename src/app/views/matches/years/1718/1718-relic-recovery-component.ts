/**
 * Created by Kyle Flynn on 11/7/2017.
 */
import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Match from '../../../../models/Match';

@Component({
  selector: 'toa-relic-recovery',
  templateUrl: './1718-relic-recovery.component.html',
  providers: [FTCDatabase]
})
export class RelicRecoveryComponent {

  @Input() match: Match;

  constructor(private router: Router) {}

  openTeamPage(teamKey: number) {
    this.router.navigate(['/teams', teamKey]);
  }

  openEvent(eventKey: string): void {
    this.router.navigate(['/events', eventKey]);
  }

}
