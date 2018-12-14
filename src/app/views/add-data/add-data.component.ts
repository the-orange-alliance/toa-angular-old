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
    this.app.setDescription('Manage your favorite teams and events');
  }

  sendAnalytic(category, label, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: 10
    });
  }
}
