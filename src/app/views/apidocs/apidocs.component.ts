import { Component } from '@angular/core';
import {TheOrangeAllianceGlobals} from '../../app.globals';

@Component({
  selector: 'toa-apidocs',
  templateUrl: './apidocs.component.html',
  providers: [TheOrangeAllianceGlobals]
})
export class ApiDocsComponent {
  
  constructor(private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('API Docs');
  }

  stringify(jsonStr): string {
    return JSON.stringify(JSON.parse(jsonStr), null, '\t');
  }
}
