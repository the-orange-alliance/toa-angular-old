import { Component, Input } from '@angular/core';
import Team from '../../models/Team';

@Component({
  selector: 'toa-team-item',
  templateUrl: './team.item.component.html'
})
export class TeamItemComponent {
  @Input() team: Team;
  @Input() clickable = true;
}
