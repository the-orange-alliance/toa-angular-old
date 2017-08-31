import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';

@Component({
  selector: 'toa-about',
  templateUrl: './about.component.html',
  providers: [FTCDatabase]
})
export class AboutComponent {

  ver_routes: any;

  constructor(private router: Router, private ftc: FTCDatabase) {
    this.ftc.getWebChangelog().subscribe((data) => {
      this.ver_routes = data;
    }, (err) => {
      console.log(err);
    });
  }



}
