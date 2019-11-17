import { Component, Input } from '@angular/core';
import { CloudFunctions } from '../../providers/cloud-functions';
import { TranslateService } from '@ngx-translate/core';
import { MdcSnackbar } from '@angular-mdc/web';
import League from '../../models/League';
import LeagueDiv from '../../models/LeagueDiv';
import User from '../../models/User';

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
  @Input() user: User;

  viewable = true;

  constructor(private cloud: CloudFunctions, private translate: TranslateService, private snackbar: MdcSnackbar) {

  }

  deleteDivision(division: LeagueDiv): void {
    this.cloud.toaDelete(this.user.firebaseUser, '/league/division/' + division.divisionKey).then((success) => {
      this.translate.get('pages.account.league_division_deletion_success').subscribe((str) => {
        this.snackbar.open(`${str}`);
        this.viewable = false;
      });
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
    });
  }
  deleteLeague(league: League): void {
    this.cloud.toaDelete(this.user.firebaseUser, '/league/' + league.leagueKey).then((success) => {
      this.translate.get('pages.account.league_deletion_success').subscribe((str) => {
        this.snackbar.open(`${str}`);
        this.viewable = false
      });
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
    });
  }
}

