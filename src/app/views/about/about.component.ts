import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  providers: [FTCDatabase]
})
export class AboutComponent {


  constructor(private router: Router) {

  }


}
