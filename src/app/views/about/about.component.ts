import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TheOrangeAllianceGlobals } from '../../app.globals';

@Component({
  selector: 'toa-about',
  templateUrl: './about.component.html',
  providers: [FTCDatabase,TheOrangeAllianceGlobals]
})
export class AboutComponent {

  ver_routes: any;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa:TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle("About");
    this.ftc.getWebChangelog().subscribe((data) => {
      this.ver_routes = data;
    }, (err) => {
      console.log(err);
    });
    console.log("Want to help develop TOA?");
    console.log("Join the discord!");
    console.log();


    console.log("Also TheReddKing say hai :P");
  }



}
