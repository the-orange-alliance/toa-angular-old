import { Component } from '@angular/core';
import {TheOrangeAllianceGlobals} from '../../app.globals';

@Component({
  selector: 'toa-page-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class PageNotFoundComponent {

  random: number;

  constructor(private app: TheOrangeAllianceGlobals) {
    this.app.setTitle('404');
    const images = 3;
    this.random = Math.floor(Math.random() * images + 1);
  }
}
