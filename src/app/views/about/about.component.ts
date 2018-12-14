import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [TheOrangeAllianceGlobals]
})
export class AboutComponent {

  constructor(private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('About');
  }

  sendAnalytic(category, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: '/about',
      eventAction: action,
      eventValue: 10
    });
  }

}
