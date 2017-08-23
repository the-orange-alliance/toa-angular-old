import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'streaming',
  templateUrl: './streaming.component.html',
  providers: [FTCDatabase]
})
export class StreamingComponent {


  constructor(private router: Router) {

  }


}
