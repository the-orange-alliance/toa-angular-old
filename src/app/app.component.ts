import {Component, NgZone, ViewChild} from '@angular/core';
import { FTCDatabase } from './providers/ftc-database';
import { TeamFilter } from './util/team-utils';
import { Router } from '@angular/router';
import {EventFilter} from './util/event-utils';
import { TheOrangeAllianceGlobals } from './app.globals';
import { MdcAppBar, MdcTextField } from '@angular-mdc/web';
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
  @ViewChild('searchInput') searchInput: MdcTextField;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa: TheOrangeAllianceGlobals, private _ngZone: NgZone) {
    this._mediaMatcher.addListener(mql => this._ngZone.run(() => this._mediaMatcher = mql));

    this.current_year = new Date().getFullYear();
    this.teamSearchResults = [];
    this.eventSearchResults = [];

    this.ftc.getAllTeams().then((data: Team[]) => {
      this.teams = data;
      this.teamsFilter = new TeamFilter(this.teams);
    });

    this.ftc.getAllEvents().then((data: Event[]) => {
      this.events = data;
      this.eventsFilter = new EventFilter(this.events);
    });
  }

  performSearch(): void {
    const maxResults = 8;

    if (this.teamsFilter && this.eventsFilter && this.search) {
      this.teamsFilter.filterArray(null, this.search, null, null);
      this.eventsFilter.searchFilter(this.search);
      this.teams = this.teamsFilter.getFilteredArray();
      this.events = this.eventsFilter.getFilteredArray();
      const eventLength = this.events.length;
      const teamsLength = this.teams.length;
      this.teamSearchResults = this.teams.splice(0, maxResults);
      this.eventSearchResults = this.events.splice(0, maxResults);
      if (teamsLength + eventLength > maxResults) {
        this.isMoreSearch = teamsLength + eventLength - maxResults;
      } else {
        this.isMoreSearch = 0;
      }
    } else {
      this.teamSearchResults = [];
      this.eventSearchResults = [];
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
