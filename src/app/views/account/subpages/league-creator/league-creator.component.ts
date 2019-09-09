import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';
import {MdcSelect, MdcSnackbar, MdcTextField} from '@angular-mdc/web';
import Region from '../../../../models/Region';
import {FTCDatabase} from '../../../../providers/ftc-database';
import League from '../../../../models/League';

@Component({
  selector: 'toa-account-create-league',
  templateUrl: './league-creator.component.html',
  styleUrls: ['../../account.component.scss']
})
export class LeagueCreatorComponent implements OnInit {

  @Input() user: User;

  @ViewChild('league_key', {static: false}) leagueId: MdcTextField;
  @ViewChild('league_description', {static: false}) leagueDesc: MdcTextField;

  @ViewChild('division_key', {static: false}) divisionId: MdcTextField;
  @ViewChild('division_desc', {static: false}) divisionDesc: MdcTextField;

  @ViewChild('division_league', {static: false}) divisionLeague: MdcSelect;


  regions: Region[];

  leagues: League[] = [];

  divisions: League[] = [];

  currentRegion: Region = null;
  currentLeague: League = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions,  private ftc: FTCDatabase, private translate: TranslateService, private snackbar: MdcSnackbar) {

  }

  ngOnInit() {
    this.translate.get('pages.account.manage_events').subscribe((res) => {
      this.appBarService.setTitle('myTOA - ' + res, true)
    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      this.regions = data;
      this.currentRegion = this.regions[0];
    });
    this.ftc.getAllLeagues().then( (data: League[]) => {
      // TODO: There has got to be a better way of linking the division to their parent league
      for (const object of data) {
        if (object.division !== undefined && object.division !== null && object.division.length > 0) {
          for (const league of data) {
            if (object.leagueKey.indexOf(league.leagueKey) > -1 && object.regionKey === league.regionKey) {
              object.divisionParent = league;
              this.divisions.push(object);
              break;
            }
          }
        } else {
          this.leagues.push(object);
        }
      }
      this.currentLeague = this.leagues[0];
    });
  }

  createLeague(): void {
    const newLeague = new League();
    newLeague.description = this.leagueDesc.value;
    newLeague.leagueKey = this.leagueId.value;
    newLeague.regionKey = this.currentRegion.regionKey;

    this.cloud.toaPost(this.user.firebaseUser, [newLeague.toJSON()], '/league/').then( (data) => {
      this.translate.get('pages.account.league_creation_success').subscribe((str) => {
        this.snackbar.open(`${str}`);
        // this.snackbar.open(str, 'Go').afterDismiss().subscribe(reason => {
          // if (reason === 'action') { this.router.navigateByUrl('/leagues/' + league.leagueKey); } // TODO: Add 'go' button when League page is created
        // });
      });

      this.leagues.push(newLeague);
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
      console.log(err);
    });
  }

  createDivision(): void {
    const newLeague = new League();
    newLeague.description = this.divisionDesc.value;
    newLeague.leagueKey = this.currentLeague.leagueKey + '-' + this.divisionId.value;
    newLeague.regionKey = this.currentLeague.regionKey;
    newLeague.division = this.divisionId.value;

    this.cloud.toaPost(this.user.firebaseUser, [newLeague.toJSON()], '/league/').then( (data) => {
      this.translate.get('pages.account.league_division_creation_success').subscribe((str) => {
        this.snackbar.open(`${str}`);
        // this.snackbar.open(str, 'Go').afterDismiss().subscribe(reason => {
          // if (reason === 'action') { this.router.navigateByUrl('/leagues/' + league.leagueKey); } // TODO: Add 'go' button when League page is created
        // });
      });
      newLeague.divisionParent = this.currentLeague;
      this.divisions.push(newLeague);
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
      console.log(err);
    });
  }

  onRegionChange(event: {index: any, value: any}) {
    this.currentRegion = this.regions[event.index - 1];
  }

  onLeagueChange(event: {index: any, value: any}) {
    this.currentLeague = this.leagues[event.index - 1];
  }

  sendAnalytic(category, label, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: 10
    });
  }
}
