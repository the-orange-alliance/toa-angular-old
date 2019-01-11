import { Component, HostListener, Inject, Injectable, NgZone, ViewChild } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { TranslateService } from '@ngx-translate/core';
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
@Injectable()
export class TheOrangeAllianceComponent {

  teams: Team[];

  events: Event[];
  eventsFilter: EventFilter;

  search: string;
  teamSearchResults: Team[];
  eventSearchResults: Event[];
  showSearch: boolean;

  current_year: any;
  selectedLanguage = '';

  user = [];

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MdcTopAppBar) appBar: MdcTopAppBar;

  constructor(public router: Router, private ftc: FTCDatabase, private ngZone: NgZone,
              db: AngularFireDatabase, auth: AngularFireAuth, public translate: TranslateService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {

    translate.setDefaultLang('en'); // this language will be used as a fallback when a translation isn't found in the current language
    this.selectedLanguage = this.storage.get('lang') || translate.getBrowserLang();
    this.languageSelected();

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user['email'] = user.email;
        db.object(`Users/${user.uid}/fullName`).query.once('value').then(data => {
          this.user['fullName'] = data.val();
        });
      } else {
        this.user = null;
      }
    });

    this.mediaMatcher.addListener(mql => this.ngZone.run(() => this.mediaMatcher = mql));

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

  isScreenSmall(): boolean {
    return this.router.url === '/stream' || this.mediaMatcher.matches;
  }

  performSearch(): void {
    const maxResults = 5;
    const query = this.search && this.search.trim().length > 0 ? this.search.toLowerCase().trim() : null;

    if (query && this.teams && this.eventsFilter) {
      this.teamSearchResults = this.teams.filter(team => (
        String(team.teamKey).includes(query) ||
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

  navToTopSearch(): void {
    if (this.teamSearchResults.length > 0) {
      this.router.navigate(['/teams', this.teamSearchResults[0].teamKey]);
      this.sendAnalytic('search',  this.teamSearchResults[0].teamKey);
    } else if (this.eventSearchResults.length > 0) {
      this.router.navigate(['/events', this.eventSearchResults[0].eventKey]);
      this.sendAnalytic('search',  this.eventSearchResults[0].eventKey);
    } else if (this.search && this.search.trim().length > 0) {
      this.router.navigate(['/teams', this.search.trim()]);
      this.sendAnalytic('search',  this.search.trim());
    } else {

      this.router.navigate(['/not-found']);
    }
    this.showSearch = false;
    this.search = '';
  }

  languageSelected(): void {
    this.storage.set('lang', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
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
