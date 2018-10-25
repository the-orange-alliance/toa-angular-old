import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-account',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  providers: [TheOrangeAllianceGlobals]
})
export class AddDataComponent {

  constructor(private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('Add Data');
  }
}
