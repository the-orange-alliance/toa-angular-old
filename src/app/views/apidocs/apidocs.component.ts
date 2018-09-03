import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import {TheOrangeAllianceGlobals} from '../../app.globals';

@Component({
  selector: 'toa-apidocs',
  templateUrl: './apidocs.component.html',
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class ApiDocsComponent {

  api_routes: any;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('API Docs');

    this.ftc.getAPIDoc().subscribe((data) => {
      this.api_routes = data;
      console.log(data)
    }, (err) => {
      console.log(err);
    });
  }

  stringify(jsonStr): string {
    return JSON.stringify(JSON.parse(jsonStr), null, '\t');
  }
}
