import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'toa-page-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class PageNotFoundComponent {

  random: number;

  constructor(private router: Router) {
    const max = 3;
    this.random = Math.floor(Math.random() * (max - 1) + 1);
  }
}
