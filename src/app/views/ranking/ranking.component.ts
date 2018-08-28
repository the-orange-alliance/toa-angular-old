import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'toa-ranking',
  templateUrl: './ranking.component.html',
  providers: [FTCDatabase]
})
export class RankingComponent {


  constructor(private router: Router) {

  }


}
