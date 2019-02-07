import { Component, OnInit } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AppBarService } from '../../app-bar.service';

@Component({
  selector: 'toa-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [TheOrangeAllianceGlobals]
})
export class AboutComponent implements OnInit {

  constructor(app: TheOrangeAllianceGlobals, private appBarService: AppBarService) {
    app.setTitle('About');
    appBarService.setTitle('About');
  }

  ngOnInit() {
    this.appBarService.setTitle('About');
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
