import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';
import {MdcSelect, MdcSnackbar, MdcTextField} from '@angular-mdc/web';
import Region from '../../../../models/Region';
import {FTCDatabase} from '../../../../providers/ftc-database';
import League from '../../../../models/League';
import Season from '../../../../models/Season';
import LeagueDiv from '../../../../models/LeagueDiv';

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
  divisions: LeagueDiv[] = [];
  seasons: Season[] = [];

  currentRegion: Region = null;
  currentLeague: League = null;
  currentSeason: Season = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions,  private ftc: FTCDatabase, private translate: TranslateService, private snackbar: MdcSnackbar) {

  }

  ngOnInit() {
    this.translate.get('pages.account.division_tab.manage_leagues').subscribe((res) => {
      this.appBarService.setTitle('myTOA - ' + res, true)
    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      this.regions = data;
      this.currentRegion = this.regions[0];
    });
    this.ftc.getAllLeagues(this.ftc.year).then( (data: League[]) => {
      this.leagues = data;
      const newDivisions = [];
      this.currentLeague = this.leagues[0];
      this.ftc.getAllLeagueDivisions(this.ftc.year).then( (leagueDiv: LeagueDiv[]) => {
        this.divisions = leagueDiv;
        for (const division of leagueDiv) {
          for (const league of this.leagues) {
            if (league.leagueKey === division.leagueKey) {
              division.leagueDesc = league.description;
              newDivisions.push(division);
              break;
            }
          }
        }
        this.divisions = newDivisions;
      });
    });
    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data;
      this.currentSeason = this.seasons[0];
    });
  }

  createLeague(): void {
    const newLeague = new League();
    newLeague.description = this.leagueDesc.value;
    newLeague.leagueKey = this.currentSeason.seasonKey + '-' + this.currentRegion.regionKey + '-' + this.leagueId.value;
    newLeague.regionKey = this.currentRegion.regionKey;
    newLeague.seasonKey = this.currentSeason.seasonKey;

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
    const newLeague = new LeagueDiv();
    newLeague.description = this.divisionDesc.value;
    newLeague.divisionKey = this.currentLeague.leagueKey + '-' + this.divisionId.value;
    newLeague.leagueKey = this.currentLeague.leagueKey;
    newLeague.regionKey = this.currentLeague.regionKey;
    newLeague.seasonKey = this.currentLeague.seasonKey;

    this.cloud.toaPost(this.user.firebaseUser, [newLeague.toJSON()], '/league/division/').then( (data) => {
      this.translate.get('pages.account.league_division_creation_success').subscribe((str) => {
        this.snackbar.open(`${str}`);
        // this.snackbar.open(str, 'Go').afterDismiss().subscribe(reason => {
          // if (reason === 'action') { this.router.navigateByUrl('/leagues/' + league.leagueKey); } // TODO: Add 'go' button when League page is created
        // });
      });
      newLeague.leagueDesc = this.currentLeague.description;
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

  onSeasonChange(event: {index: any, value: any}) {
    this.currentSeason = this.seasons[event.index];
    this.ftc.getAllLeagues(this.currentSeason.seasonKey).then( (data: League[]) => {
      this.leagues = data;
      const newDivisions = [];
      this.currentLeague = this.leagues[0];
      this.ftc.getAllLeagueDivisions(this.currentSeason.seasonKey).then( (leagueDiv: LeagueDiv[]) => {
        this.divisions = leagueDiv;
        for (const division of leagueDiv) {
          for (const league of this.leagues) {
            if (league.leagueKey === division.leagueKey) {
              division.leagueDesc = league.description;
              newDivisions.push(division);
              break;
            }
          }
        }
        this.divisions = newDivisions;
      }).catch((err) => this.divisions = []);
    }).catch((err) => this.leagues = []);
  }

  getSeasonString(seasonKey: string, description?: string) {
    const codeOne = seasonKey.toString().substring(0, 2);
    const codeTwo = seasonKey.toString().substring(2, 4);

    if (description) {
      return '20' + codeOne + '/' + codeTwo + ' - ' + description;
    } else {
      return '20' + codeOne + '/' + codeTwo;
    }
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
