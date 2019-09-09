import { Component, Input } from '@angular/core';
import League from '../../models/League';

@Component({
  selector: 'toa-league-item',
  templateUrl: './league.item.component.html',
  styleUrls: ['./league.item.component.scss']
})
export class LeagueItemComponent {

  @Input() league: League;
  @Input() hideDelete = true;
  @Input() clickable = true;

}
