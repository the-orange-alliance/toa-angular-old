import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class PageNotFoundComponent {

  constructor(private router: Router) {}

}
