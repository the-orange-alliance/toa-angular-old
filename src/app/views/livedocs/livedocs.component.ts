import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TheOrangeAllianceGlobals} from '../../app.globals';

@Component({
  selector: 'toa-livedocs',
  templateUrl: './livedocs.component.html',
  providers: [TheOrangeAllianceGlobals]
})
export class LiveDocsComponent {

  constructor(private router: Router, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('DataSync');
  }
}
