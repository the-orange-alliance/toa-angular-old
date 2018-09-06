import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-about',
  templateUrl: './about.component.html',
  providers: [TheOrangeAllianceGlobals]
})
export class AboutComponent {

  constructor(private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('About');
  }

}
