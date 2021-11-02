import { Component, Input } from '@angular/core';
import Team from '../../../../models/Team';

@Component({
  selector: 'toa-team-results',
  templateUrl: './team-results.component.html'
})
export class TeamResultsComponent {

  @Input() team: Team;
  @Input() season: string;
  @Input() eventsReady: boolean;

  constructor() {

  }

}
