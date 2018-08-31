import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-account',
  templateUrl: './account.component.html',
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class AccountComponent {

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('myTOA');
  }
}
