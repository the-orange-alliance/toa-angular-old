import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-account',
  templateUrl: './account.component.html',
  providers: [TheOrangeAllianceGlobals]
})
export class AccountComponent {

  constructor(private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('myTOA');
  }
}
