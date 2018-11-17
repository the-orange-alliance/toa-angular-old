import { Component, NgZone, ViewChild } from '@angular/core';
import { FTCDatabase } from './providers/ftc-database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { EventFilter } from './util/event-utils';
import { TheOrangeAllianceGlobals } from './app.globals';
import { MdcTopAppBar, MdcTextField } from '@angular-mdc/web';
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

  events: Event[];
  eventsFilter: EventFilter;

  search: any;
  teamSearchResults: Team[];
  eventSearchResults: Event[];
  isMoreSearch: any;

  current_year: any;

  user = [];

  private _mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MdcTopAppBar) appBar: MdcTopAppBar;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa: TheOrangeAllianceGlobals, private _ngZone: NgZone,
              db: AngularFireDatabase, auth: AngularFireAuth) {
    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user['email'] = user.email;
        db.object(`Users/${user.uid}/fullName`).snapshotChanges()
          .subscribe(element => {
            this.user['fullName'] = element.payload.val();
          });
      } else {
        this.user = null;
      }
    });

    this._mediaMatcher.addListener(mql => this._ngZone.run(() => this._mediaMatcher = mql));

    this.current_year = new Date().getFullYear();
    this.teamSearchResults = [];
    this.eventSearchResults = [];

    this.ftc.getAllTeams().then((data: Team[]) => {
      this.teams = data;
    });

    this.ftc.getAllEvents().then((data: Event[]) => {
      this.events = data;
      this.eventsFilter = new EventFilter(this.events);
    });
  }

  performSearch(): void {
    const maxResults = 8;

    if (this.eventsFilter && this.search) {
      this.teamSearchResults = this.teams.filter(team => (
        (team.teamNumber+'').includes(this.search) ||
        (team.teamNameShort && team.teamNameShort.toLowerCase().includes(this.search))
      ));
      this.teamSearchResults = this.teamSearchResults.splice(0, maxResults);

      this.eventsFilter.searchFilter(this.search);
      this.eventSearchResults = this.eventsFilter.getFilteredArray();
      this.eventSearchResults = this.eventSearchResults.splice(0, maxResults);

    } else {
      this.teamSearchResults = [];
      this.eventSearchResults = [];
    }
  }

  isScreenSmall(): boolean {
    return this.router.url === '/stream' || this._mediaMatcher.matches;
  }

  focusSearchInput(searchInput: MdcTextField): void {
    // When the modal opens, it takes the focus
    // We'll wait 4ms until it opens
    setTimeout(function () {
      searchInput.focus();
    }, 600);
  }
}
