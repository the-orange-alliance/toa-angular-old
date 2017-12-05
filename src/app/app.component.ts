import { Component } from '@angular/core';
import { FTCDatabase } from './providers/ftc-database';
import { TeamFilter } from './util/team-utils';
import { Router } from '@angular/router';
import {EventFilter} from "./util/event-utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FTCDatabase]
})
export class TheOrangeAllianceComponent {

  teams: any;
  teams_filter: TeamFilter;

  events: any;
  events_filter: EventFilter;

  search: any;
  team_search_results: any;
  event_search_results: any;

  current_year: any;

  constructor(private router: Router, private ftc: FTCDatabase) {
    this.current_year = new Date().getFullYear();
    this.team_search_results = [];
    this.event_search_results = [];

    this.ftc.getEveryTeam().subscribe((data) => {
      this.teams = data;
      this.teams_filter = new TeamFilter(this.teams);
    }, (err) => {
      console.log(err);
    });

    this.ftc.getAllEvents().subscribe((data) => {
         this.events = data;
         this.events_filter = new EventFilter(this.events);
    }, (err) => {
      console.log(err);
    });
  }
  performSearch(): void {
    if (this.search) {
      this.teams_filter.filterArray(null, this.search, null, null);
      this.events_filter.searchFilter(this.search);

      this.teams = this.teams_filter.getFilteredArray();
      this.events = this.events_filter.getFilteredArray();
      document.getElementById('search').style.display = 'block';
      if (this.teams.length < 4) {
        this.team_search_results = this.teams.splice(0, this.teams.length);
      } else {
        this.team_search_results = this.teams.splice(0, 4);
      }
      if (this.events.length < 4) {
        this.event_search_results = this.events.splice(0, this.events.length);
      } else {
        this.event_search_results = this.events.splice(0, 4);
      }
    } else {
      document.getElementById("search").style.display = "none";
    }
  }

  expandDropdown(e) {

    if (document.getElementsByClassName('collapsed')[0] !== null) {
      if (e.srcElement.classList.contains('dropdown-toggle')) {
        e.srcElement.parentElement.classList.add('open');
        e.srcElement.classList.add('dropdown-active');
        e.srcElement.setAttribute('aria-expanded', 'true');
      }
    }

  }

  collapseDropdown(e) {

    if (document.getElementsByClassName('collapsed')[0] !== null) {
      e.path[0].classList.remove('open');
      e.fromElement.children[0].setAttribute('aria-expanded', 'false');
      e.fromElement.children[0].classList.remove('dropdown-active');
    }

  }

  openTeam(team_number): void {
    this.router.navigate(['/teams', team_number]);
  }

  hideDropdown() {
    document.getElementById("search").style.display = "none";
  }

}
