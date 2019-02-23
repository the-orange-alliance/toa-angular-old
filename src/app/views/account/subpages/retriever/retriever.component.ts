import { Component, Input, OnInit } from '@angular/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import Event from '../../../../models/Event';

@Component({
  selector: 'toa-account-retriever',
  templateUrl: './retriever.component.html',
  styleUrls: ['../../account.component.scss']
})
export class RetrieverComponent implements OnInit {

  @Input() firebaseUser: firebase.User;
  newEvents: Event[] = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Retriever');
    this.cloud.eventsRetriever(this.firebaseUser).then((events: any) => {
      this.newEvents = events.new_events.map((result: any) => new Event().fromJSON(result));
      console.log(this.newEvents);
    });
  }

  createEvents() {
    // TODO
  }
}
