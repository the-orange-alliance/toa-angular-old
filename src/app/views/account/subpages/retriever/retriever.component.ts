import { Component, Input, OnInit } from '@angular/core';
import { MdcSnackbar } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';
import Event from '../../../../models/Event';

@Component({
  selector: 'toa-account-retriever',
  templateUrl: './retriever.component.html',
  styleUrls: ['../../account.component.scss']
})
export class RetrieverComponent implements OnInit {

  @Input() user: User;
  newEvents: Event[] = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions,
              private translate: TranslateService, private snackbar: MdcSnackbar) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Retriever');
    this.cloud.eventsRetriever(this.user.firebaseUser).then((events: any) => {
      this.newEvents = events.new_events.map((result: any) => new Event().fromJSON(result));
      console.log(this.newEvents);
    });
  }

  createEvents() {
    const json = this.newEvents.map((event) => event.toJSON());
    this.cloud.createEvent(this.user.firebaseUser, json).then((data) => {
      this.translate.get('pages.account.retriever.success', {value: this.newEvents.length}).subscribe((str) => {
        this.snackbar.open(str).afterDismiss();
      });
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
    });
  }
}
