import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-about',
  templateUrl: './about.component.html',
  providers: [TheOrangeAllianceGlobals]
})
export class AboutComponent {

  constructor(private router: Router, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('About');
  }

}
