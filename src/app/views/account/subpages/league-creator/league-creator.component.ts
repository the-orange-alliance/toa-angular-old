import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';
import {MdcTextField} from '@angular-mdc/web';
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
  apiKeys: any = {};
  generatingEventApiKey: boolean;

  @ViewChild('league_key', {static: false}) leagueId: MdcTextField;
  @ViewChild('league_description', {static: false}) leagueDesc: MdcTextField;

  regions: Region[];

  currentRegion: Region = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions,  private ftc: FTCDatabase, private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.get('pages.account.manage_events').subscribe((res) => {
      this.appBarService.setTitle('myTOA - ' + res, true)
    });
    this.apiKeys = this.user.eventsApiKeys;
    this.ftc.getAllRegions().then((data: Region[]) => {
      this.regions = data;
      this.currentRegion = this.regions[0];
    });
  }

  createLeague(): void {
    const newLeague = new League();
    newLeague.description = this.leagueDesc.value;
    newLeague.leagueKey = this.leagueId.value;
    newLeague.regionKey = this.currentRegion.regionKey;
    this.cloud.toaPost(this.user.firebaseUser, [newLeague.toJSON()], '/league/').then(async () => {
      this.generatingEventApiKey = false;
      this.user = await this.cloud.getUserData(this.user.firebaseUser);
    }).catch((err) => {
      this.generatingEventApiKey = false;
      console.log(err);
    });
  }

  onRegionChange(event: {index: any, value: any}) {
    this.currentRegion = this.regions[event.index - 1];
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
