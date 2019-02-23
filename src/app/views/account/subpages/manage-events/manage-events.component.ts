import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';

@Component({
  selector: 'toa-account-manage-events',
  templateUrl: './manage-events.component.html'
})
export class ManageEventsComponent implements OnInit {

  @Input() user: User;
  apiKeys: any = {};
  generatingEventApiKey: boolean;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions, private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.get('pages.account.manage_events').subscribe((res) => {
      this.appBarService.setTitle('myTOA - ' + res, true)
    });
    this.apiKeys = this.user.eventsApiKeys;
  }

  generateEventApiKey(eventKey: string): void {
    this.cloud.generateEventApiKey(this.user.firebaseUser, eventKey).then(async () => {
      this.generatingEventApiKey = false;
      this.user = await this.cloud.getUserData(this.user.firebaseUser);
    }).catch((err) => {
      this.generatingEventApiKey = false;
      console.log(err);
    });
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
