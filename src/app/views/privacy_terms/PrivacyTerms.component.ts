import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'toa-terms',
  templateUrl: './privacy-terms.component.html',
  providers: [FTCDatabase]
})
export class PrivacyTermsComponent {

  constructor(private router: Router) {

  }

}
