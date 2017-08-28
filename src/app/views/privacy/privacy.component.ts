import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'toa-privacy',
  templateUrl: './privacy.component.html',
  providers: [FTCDatabase]
})
export class PrivacyComponent {


  constructor(private router: Router) {

  }


}
