import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import Match from '../../../../models/Match';

@Component({
  selector: 'toa-rover-ruckus',
  templateUrl: './1819-rover-ruckus.component.html'
})
export class RoverRuckusComponent {

  @Input() match: Match;

  constructor(private router: Router) {}

  openTeamPage(teamKey: number) {
    this.router.navigate(['/teams', teamKey]);
  }

  openEvent(eventKey: string): void {
    this.router.navigate(['/events', eventKey]);
  }

}
