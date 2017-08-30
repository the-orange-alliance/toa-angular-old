import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'toa-apidocs',
  templateUrl: './apidocs.component.html',
  providers: [FTCDatabase]
})
export class ApiDocsComponent {

  api_routes: any;

  constructor(private router: Router, private ftc: FTCDatabase) {
    this.ftc.getAPIDoc().subscribe((data) => {
      this.api_routes = data;
    }, (err) => {
      console.log(err);
    });
  }


}
