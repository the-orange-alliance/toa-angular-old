import {Component, Input, OnInit} from '@angular/core';
import ModifiedTeam from '../../models/ModifiedTeam';
import Team from '../../models/Team';

@Component({
  selector: 'toa-modified-team-item',
  templateUrl: './modified-team.item.component.html'
})
export class ModifiedTeamItemComponent implements OnInit {

  @Input() modified_team: ModifiedTeam;
  @Input() clickable = true;
  team: Team;

  ngOnInit(): void {
    this.team = this.modified_team.originalTeam;
  }
}
