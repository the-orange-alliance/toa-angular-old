import {Component, NgZone, ViewChild} from '@angular/core';
import { FTCDatabase } from './providers/ftc-database';
import { TeamFilter } from './util/team-utils';
import { Router } from '@angular/router';
import {EventFilter} from './util/event-utils';
import { TheOrangeAllianceGlobals } from './app.globals';
import {MdcAppBar} from '@angular-mdc/web';
import Team from './models/Team';
import Event from './models/Event';

const SMALL_WIDTH_BREAKPOINT = 1240;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})

export class TheOrangeAllianceComponent {

  teams: Team[];
  teamsFilter: TeamFilter;

  isMoreSearch: any;

  events: Event[];
  eventsFilter: EventFilter;

  search: any;
  teamSearchResults: Team[];
  eventSearchResults: Event[];

  current_year: any;

  private _mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MdcAppBar) appBar: MdcAppBar;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa: TheOrangeAllianceGlobals, private _ngZone: NgZone) {
    this._mediaMatcher.addListener(mql => this._ngZone.run(() => this._mediaMatcher = mql));

    this.current_year = new Date().getFullYear();
    this.teamSearchResults = [];
    this.eventSearchResults = [];
    const x = this;
    document.addEventListener('keydown', function(e) {x.performSearchCallback(e, x)});

    this.ftc.getAllTeams().then((data: Team[]) => {
      this.teams = data;
      this.teamsFilter = new TeamFilter(this.teams);
    });

    this.ftc.getAllEvents().then((data: Event[]) => {
      this.events = data;
      this.eventsFilter = new EventFilter(this.events);
    });
  }

  performSearchCallback(event, r): void {
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
      this.teamsFilter.filterArray(null, this.search, null, null);
      this.eventsFilter.searchFilter(this.search);
      this.teams = this.teamsFilter.getFilteredArray();
      this.events = this.eventsFilter.getFilteredArray();
      document.getElementById('search').style.display = 'block';
      // SO there are obviously going to be more search results, but let's try and make it more readable.
      const eventLength = this.events.length;
      const teamsLength = this.teams.length;
      // Prioritize Teams but max results but min 2 of each
      const maxResults = 16;
      this.teamSearchResults = this.teams.splice(0, Math.min(teamsLength, Math.min(maxResults, Math.max(maxResults - eventLength, 2))));
      this.eventSearchResults = this.events.splice(0, maxResults - this.teamSearchResults.length);
      if (teamsLength + eventLength > maxResults) {
        this.isMoreSearch = teamsLength + eventLength - maxResults;
      } else {
        this.isMoreSearch = 0;
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
