import { Component, HostListener, Inject, Injectable, NgZone, OnInit, ViewChild } from '@angular/core';
import { AppBarService } from './app-bar.service';
import { Location } from '@angular/common';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { TranslateService } from '@ngx-translate/core';
import { FTCDatabase } from './providers/ftc-database';
import { CloudFunctions, Service } from './providers/cloud-functions';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { EventFilter } from './util/event-utils';
import { TheOrangeAllianceGlobals } from './app.globals';
import { MdcTopAppBar, MdcDrawer } from '@angular-mdc/web';
import { environment } from '../environments/environment';
import Team from './models/Team';
import Event from './models/Event';
import mdcInfo from '../../node_modules/@angular-mdc/web/package.json'

const SMALL_WIDTH_BREAKPOINT = 1240;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals, AppBarService]
})
@Injectable()
export class TheOrangeAllianceComponent implements OnInit {

  server: { 'is_dev': boolean, 'last_commit': string, 'build_time': string, 'api_version': string, 'mdc_version': string } = {
    'is_dev': false,
    'last_commit': null,
    'build_time': null,
    'api_version': null,
    'mdc_version': null
  };

  teams: Team[];
  services = Service;

  events: Event[];
  eventsFilter: EventFilter;

  search: string;
  teamSearchResults: Team[];
  eventSearchResults: Event[];
  showSearch: boolean;
  showMobileSearch: boolean;

  current_year: any;
  selectedLanguage = '';

  user: firebase.User;
  isAdmin: boolean = false;

  matcher: MediaQueryList;
  @ViewChild(MdcTopAppBar) appBar: MdcTopAppBar;
  @ViewChild(MdcDrawer) drawer: MdcDrawer;
  title: string;

  constructor(public router: Router, private ftc: FTCDatabase, private ngZone: NgZone, private location: Location,
              db: AngularFireDatabase, auth: AngularFireAuth, private translate: TranslateService, private cloud: CloudFunctions,
              @Inject(LOCAL_STORAGE) private storage: StorageService, private appBarService: AppBarService) {

    translate.setDefaultLang('en'); // this language will be used as a fallback when a translation isn't found in the current language
    this.selectedLanguage = this.storage.get('lang') || translate.getBrowserLang();
    this.languageSelected();

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.router.events.subscribe(() => {
      this.showMobileSearch = false;
      setTimeout(() => {
        this.title = this.appBarService.titleLong;
      });
    });

    this.appBarService.titleChange.subscribe(title => {
      setTimeout(()=>{
        this.title = title;
      });
    });

    auth.authState.subscribe(user => {
      this.user = user;
      db.object(`Users/${this.user.uid}/level`).query.once('value').then(level => {
         this.isAdmin = level.val() && level.val() >= 6;
         if (this.isAdmin) {
           this.ftc.getApiVersion().then((version: string) => {
             this.server.api_version = version;
           });
           this.server.is_dev = !environment.production;
           if (!this.server.is_dev) {
             this.server.last_commit = environment.commit;

             const d = new Date(environment.build_time);
             const dateString = //2019/02/24 16:03:57
             d.getUTCFullYear() + "/" +
               ("0" + (d.getUTCMonth()+1)).slice(-2) + "/" +
               ("0" + d.getUTCDate()).slice(-2) + " " +
               ("0" + d.getUTCHours()).slice(-2) + ":" +
               ("0" + d.getUTCMinutes()).slice(-2) + ":" +
               ("0" + d.getUTCSeconds()).slice(-2);
             this.server.build_time = dateString;
           }
           this.server.mdc_version = mdcInfo.version;
         }
      });
    });

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

  ngOnInit() {
    this.matcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
    this.matcher.addListener((event: MediaQueryListEvent) => this.ngZone.run(() => event.matches));
  }

  isScreenSmall(): boolean {
    return this.router.url === '/stream' || this.matcher.matches;
  }

  back() {
    this.location.back();
  }

  drawerItemClicked() {
    this.drawer.open = false;
  }

  performSearch(): void {
    const maxResults = this.showMobileSearch ? 8 : 5;
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

  showMobileSearchModal(searchInput): void {
    this.showMobileSearch = true;
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

  updateService(service: Service) {
    this.cloud.update(this.user, service);
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
