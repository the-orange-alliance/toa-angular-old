import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'apidocs',
  templateUrl: './apidocs.component.html',
  providers: [FTCDatabase]
})
export class ApiDocsComponent {


  constructor(private router: Router) {

  }


}
