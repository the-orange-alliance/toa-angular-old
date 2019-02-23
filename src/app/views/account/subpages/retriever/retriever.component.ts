import { Component, Input, OnInit } from '@angular/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from "../../../../providers/cloud-functions";

@Component({
  selector: 'toa-account-retriever',
  templateUrl: './retriever.component.html'
})
export class RetrieverComponent implements OnInit {

  @Input() firebaseUser: firebase.User;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Retriever');
    this.cloud.eventsRetriever(this.firebaseUser).then((events) => {
      console.log(events);
    });
  }
}
