import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'toa-livedocs',
  templateUrl: './livedocs.component.html',
  providers: [FTCDatabase]
})
export class LiveDocsComponent {

  constructor(private router: Router, private ftc: FTCDatabase) {

  }
}
