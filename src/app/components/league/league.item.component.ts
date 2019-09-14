import { Component, Input } from '@angular/core';
import League from '../../models/League';
import LeagueDiv from '../../models/LeagueDiv';

@Component({
  selector: 'toa-league-item',
  templateUrl: './league.item.component.html',
  styleUrls: ['./league.item.component.scss']
})
export class LeagueItemComponent {

  @Input() league: League = undefined;
  @Input() division: LeagueDiv = undefined;
  @Input() hideDelete = true;
  @Input() clickable = true;

}
