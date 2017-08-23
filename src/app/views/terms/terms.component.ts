import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'terms',
  templateUrl: './terms.component.html',
  providers: [FTCDatabase]
})
export class TermsComponent {


  constructor(private router: Router) {

  }


}
