import { Component, OnInit } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AppBarService } from '../../app-bar.service';

@Component({
  selector: 'toa-page-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})

export class PageNotFoundComponent implements OnInit {

  random: number;

  constructor(app: TheOrangeAllianceGlobals, private appBarService: AppBarService) {
    app.setTitle('404');
    const images = 3;
    this.random = Math.floor(Math.random() * images + 1);
  }

  ngOnInit() {
    this.appBarService.setTitle('404 - Page Not Found', true);
  }
}
