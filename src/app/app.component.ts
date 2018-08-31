import {Component, NgZone, ViewChild} from '@angular/core';
import { FTCDatabase } from './providers/ftc-database';
import { TeamFilter } from './util/team-utils';
import { Router } from '@angular/router';
import {EventFilter} from './util/event-utils';
import { TheOrangeAllianceGlobals } from './app.globals';
import {MdcAppBar} from '@angular-mdc/web';

const SMALL_WIDTH_BREAKPOINT = 1240;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
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

  private _mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MdcAppBar) appBar: MdcAppBar;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa: TheOrangeAllianceGlobals, private _ngZone: NgZone) {
    this._mediaMatcher.addListener(mql => this._ngZone.run(() => this._mediaMatcher = mql));


    this.current_year = new Date().getFullYear();
    this.team_search_results = [];
    this.event_search_results = [];
    const x = this;
    document.addEventListener('keydown', function(e) {x.performSearchCallback(e, x)});

    console.log('CREATED DOM DOM DOM');
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

  performSearchCallback(event, r): void {
    console.log('HELLO TYPED ' + event.keyCode);
    if (event.keyCode === 27) {
      document.getElementById('removeSearch').click();
    } else if (event.keyCode === 13) {
      if (r.team_search_results.length > 0) {
        window.location.href = 'teams/' + r.team_search_results[0].team_key; // +  "?q=" + r.search;
        document.getElementById('removeSearch').click();
      } else if (r.event_search_results.length > 0) {
        window.location.href = 'events/' + r.event_search_results[0].event_key; // + "?q=" + r.search;;
        document.getElementById('removeSearch').click();
      }
    }
  }

  performSearch(): void {
    if (this.search) {
      // (<HTMLInputElement>document.getElementById("showSearch")).value = this.search;
      this.teams_filter.filterArray(null, this.search, null, null);
      this.events_filter.searchFilter(this.search);

      this.teams = this.teams_filter.getFilteredArray();
      this.events = this.events_filter.getFilteredArray();
      document.getElementById('search').style.display = 'block';

      // SO there are obviously going to be more search results, but let's try and make it more readable.
      const eventLength = this.events.length;
      const teamsLength = this.teams.length;
      // Prioritize Teams but max results but min 2 of each
      const maxResults = 16;
      this.team_search_results = this.teams.splice(0, Math.min(teamsLength, Math.min(maxResults, Math.max(maxResults - eventLength, 2))));
      this.event_search_results = this.events.splice(0, maxResults - this.team_search_results.length);
      if (teamsLength + eventLength > maxResults) {
        this.isMoreSearch = teamsLength + eventLength - maxResults;
      } else {
        this.isMoreSearch = 0
      }
    } else {
      document.getElementById('search').style.display = 'none';
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

  openEvent(event_name): void {
    this.router.navigate(['/events', event_name]);
  }
  openTeam(team_number): void {
    this.router.navigate(['/teams', team_number]);
  }

  hideDropdown() {
    document.getElementById('search').style.display = 'none';
  }

  isScreenSmall(): boolean {
    return this._mediaMatcher.matches;
  }
}
