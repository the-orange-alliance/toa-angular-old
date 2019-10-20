import {Component, Input, OnInit, ViewChild} from '@angular/core';
import User from '../../../../models/User';
import Team from '../../../../models/Team';

@Component({
  selector: 'toa-account-manage-team-data',
  templateUrl: './manage-team-data.component.html',
  styleUrls: ['./manage-team-data.component.css']
})
export class ManageTeamDataComponent implements OnInit {

  @Input() user: User;

  selectedTeam: Team;

  constructor() { }

  ngOnInit() {
  }

}
