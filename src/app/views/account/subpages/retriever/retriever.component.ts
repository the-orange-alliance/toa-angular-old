import { Component, Input, OnInit } from '@angular/core';
import { MdcSnackbar } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';
import Event from '../../../../models/Event';
import ModifiedEvent from '../../../../models/ModifiedEvent';

@Component({
  selector: 'toa-account-retriever',
  templateUrl: './retriever.component.html',
  styleUrls: ['../../account.component.scss']
})
export class RetrieverComponent implements OnInit {

  @Input() user: User;

  newEvents: Event[] = null;
  modifiedEvents: ModifiedEvent[] = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions,
              private translate: TranslateService, private snackbar: MdcSnackbar) {

  }

  ngOnInit() { // TODO Update Year Yearly :P
    this.appBarService.setTitle('Retriever');
    this.cloud.eventsRetriever(this.user.firebaseUser, 2020).then((events: any) => {
      this.newEvents = events.new_events.map((result: any) => new Event().fromJSON(result));
      this.modifiedEvents = events.modified_events.map((result: any) => new ModifiedEvent().fromJSON(result));
    });
  }

  createEvents() {
    const json = this.newEvents.map((event) => event.toJSON());
    this.cloud.createEvent(this.user.firebaseUser, json).then(() => {
      this.translate.get('pages.account.retriever.success_events', {value: this.newEvents.length}).subscribe((str) => {
        this.snackbar.open(str).afterDismiss();
      });
      this.newEvents = undefined;
      return this.cloud.eventsRetriever(this.user.firebaseUser, 2020);
    }).then((events: any) => {
      this.newEvents = events.new_events.map((result: any) => new Event().fromJSON(result));
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
    });
  }

  removeNewEventFromList(event: Event) {
    for (const e in this.newEvents) {
      if (this.newEvents[e] === event) {
        this.newEvents.splice(parseInt(e, 10), 1);
        break;
      }
    }
  }
}
