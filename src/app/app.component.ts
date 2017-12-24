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

  isMoreSearch: any;

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

      // SO there are obviously going to be more search results than 8, but let's try and make it more readable.
      let eventLength = this.events.length;
      let teamsLength = this.teams.length;
      //Prioritize Teams but max 8 results but min 2 of each
      this.team_search_results = this.teams.splice(0, Math.min(teamsLength,Math.min(8,Math.max(8-eventLength,2))));
      this.event_search_results = this.events.splice(0, 8 - this.team_search_results.length);
      if(teamsLength + eventLength > 8) {
        this.isMoreSearch = teamsLength + eventLength - 8;
      } else {
        this.isMoreSearch = 0
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
