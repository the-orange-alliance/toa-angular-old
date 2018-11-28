import { Component, HostListener, NgZone, ViewChild } from '@angular/core';
import { FTCDatabase } from './providers/ftc-database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavigationEnd, Router } from '@angular/router';
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

  search: string;
  teamSearchResults: Team[];
  eventSearchResults: Event[];
  showSearch: boolean;

  current_year: any;

  user = [];

  private _mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MdcTopAppBar) appBar: MdcTopAppBar;

  constructor(public router: Router, private ftc: FTCDatabase, private _ngZone: NgZone,
              db: AngularFireDatabase, auth: AngularFireAuth) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

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

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  performSearch(): void {
    const maxResults = 5;
    const query = this.search && this.search.trim().length > 0 ? this.search.toLowerCase().trim() : null;

    if (query && this.teams && this.eventsFilter) {
      this.teamSearchResults = this.teams.filter(team => (
        String(team.teamNumber).includes(query) ||
        (team.teamNameShort && team.teamNameShort.toLowerCase().includes(query))
      ));
      this.teamSearchResults = this.teamSearchResults.splice(0, maxResults);

      this.eventsFilter.searchFilter(query);
      this.eventSearchResults = this.eventsFilter.getFilteredArray();
      this.eventSearchResults = this.eventSearchResults.splice(0, maxResults);

      if (this.teamSearchResults.length > 0 || this.eventSearchResults.length > 0) {
        this.showSearch = true;
      }
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
    // We'll wait 6ms until it opens
    setTimeout(function () {
      searchInput.focus();
    }, 600);
  }

  getBoldText(text: string): string {
    let pattern = this.search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    pattern = pattern.split(' ').filter((t) => {
      return t.length > 0;
    }).join('|');
    const regex = new RegExp(pattern, 'gi');

    return '<p>' + (this.search ? text.replace(regex, (match) => `<b>${match}</b>`) : text) + '</p>';
  }

  teamClicked(e, teamKey): void {
    this.router.navigate(['/teams', teamKey]);
    e.preventDefault();
    e.stopPropagation();
    this.sendAnalytic('search',  teamKey);
    this.showSearch = false;
    this.search = '';
  }

  eventClicked(e, eventKey): void {
    this.router.navigate(['/events', eventKey]);
    e.preventDefault();
    e.stopPropagation();
    this.sendAnalytic('search',  eventKey);
    this.showSearch = false;
    this.search = '';
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.showSearch = false;
  }

  sendAnalytic(category, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: this.router.url,
      eventAction: action,
      eventValue: 10
    });
  }

}
