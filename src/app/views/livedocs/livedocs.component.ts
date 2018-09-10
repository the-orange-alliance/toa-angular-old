import { Component } from '@angular/core';
import {TheOrangeAllianceGlobals} from '../../app.globals';

@Component({
  selector: 'toa-livedocs',
  templateUrl: './livedocs.component.html',
  providers: [TheOrangeAllianceGlobals]
})
export class LiveDocsComponent {

  constructor(private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('DataSync');
  }
}
