import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TheOrangeAllianceGlobals} from '../../app.globals';

@Component({
  selector: 'toa-page-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class PageNotFoundComponent {

  random: number;

  constructor(private router: Router, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('404');
    const max = 3;
    this.random = Math.floor(Math.random() * (max - 1) + 1);
  }
}
