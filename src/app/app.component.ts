import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TheOrangeAllianceComponent {

  search: any;

  current_year: any;

  constructor() {
    this.current_year = new Date().getFullYear();
  }

  performSearch(): void {
    if (this.search) {
      console.log(this.search);
    }
  }

  expandDropdown(e) {

    if (document.getElementsByClassName("collapsed")[0] != null) {
      if (e.srcElement.classList.contains("dropdown-toggle")) {
        e.srcElement.parentElement.classList.add("open");
        e.srcElement.classList.add("dropdown-active");
        e.srcElement.setAttribute("aria-expanded", "true");
      }
    }

  }

  collapseDropdown(e) {

    if (document.getElementsByClassName("collapsed")[0] != null) {
      e.path[0].classList.remove("open");
      e.fromElement.children[0].setAttribute("aria-expanded", "false");
      e.fromElement.children[0].classList.remove("dropdown-active");
    }

  }

}
