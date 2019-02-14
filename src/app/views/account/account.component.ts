import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef, AfterViewInit, Inject } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FTCDatabase } from '../../providers/ftc-database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { TeamSorter } from '../../util/team-utils';
import { EventSorter } from '../../util/event-utils';
import { MdcSnackbar, MdcTextField, MdcCheckbox } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CloudFunctions } from '../../providers/cloud-functions';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { auth as providers } from 'firebase/app';
import { AppBarService } from '../../app-bar.service';
import User from '../../models/User';
import Team from '../../models/Team';
import Event from '../../models/Event';
import Season from '../../models/Season';
import Region from '../../models/Region';
import EventType from '../../models/EventType';
import {environment} from 'environments/environment';
import {initializeApp as initFbApp} from 'firebase/app';

@Component({
  selector: 'toa-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [CloudFunctions, TheOrangeAllianceGlobals, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})

export class AccountComponent implements OnInit, AfterViewChecked, AfterViewInit {

  user: firebase.User = null;
  userData: User = null;
  adminEvents = {};
  profileUrl: string = null;
  activeTab: number = -1;
  generalCache: string = null;
  selectedUser: User = null;
  users: firebase.User[] = [];

  teams: Team[];
  events: Event[];

  seasons: Season[];
  regions: Region[];
  eventTypes: EventType[];

  loaded: boolean;
  generatingApiKey: boolean;
  generatingEventApiKey: boolean;
  emailVerified = true;
  googleProvider = new providers.GoogleAuthProvider();
  githubProvider = new providers.GithubAuthProvider();
  phoneProvider;
  recaptchaVerifier;

  showCaptcha: boolean = true;

  // These are for creating the Events
  @ViewChild('event_name') eventName: MdcTextField;
  @ViewChild('event_id') eventId: MdcTextField;
  @ViewChild('start_date') startDate: MdcTextField;
  @ViewChild('end_date') endDate: MdcTextField;
  @ViewChild('website') website: MdcTextField;
  @ViewChild('venue') venue: MdcTextField;
  @ViewChild('city') city: MdcTextField;
  @ViewChild('state') state: MdcTextField;
  @ViewChild('country') country: MdcTextField;
  @ViewChild('eventCache') eventCache: MdcTextField;
  @ViewChild('teamCache') teamCache: MdcTextField;
  @ViewChild('matchCache') matchCache: MdcTextField;
  @ViewChild('dual_division') dualDivision: MdcCheckbox;
  @ViewChild('division_number') divisionNumber: MdcTextField;
  @ViewChild('division_name') divisionName: MdcTextField;
  @ViewChild('advanced') advanced: MdcCheckbox;
  @ViewChild('number_fields') numberFields: MdcTextField;
  @ViewChild('number_alliances') numberAlliances: MdcTextField;
  @ViewChild('advancement_spots') advSpots: MdcTextField;
  @ViewChild('advancement_event') advEvent: MdcTextField;

  currentSeason: Season = null;
  currentRegion: Region = null;
  currentEventType: EventType = null;

  constructor(app: TheOrangeAllianceGlobals, private router: Router, private ftc: FTCDatabase, private httpClient: HttpClient, private appBarService: AppBarService,
              private snackbar: MdcSnackbar, private db: AngularFireDatabase, private auth: AngularFireAuth, private storage: AngularFireStorage,
              private cloud: CloudFunctions, private translate: TranslateService, private loca: Location, private cdRef: ChangeDetectorRef,
              @Inject(LOCAL_STORAGE) localStorage: StorageService) {

    app.setTitle('myTOA');
    app.setDescription('Your myTOA account overview');

    if (this.router.url.indexOf('/account/events') > -1) {
      this.activeTab = 1;
    } else if (this.router.url.indexOf('/account/new-event') > -1) {
      this.activeTab = 2;
    } else if (this.router.url.indexOf('/account/users') > -1) {
      this.activeTab = 3;
    } else if (this.router.url.indexOf('/account/cache') > -1) {
      this.activeTab = 4;
    } else {
      this.activeTab = 0;
    }

    auth.auth.languageCode = localStorage.get('lang') || translate.getBrowserLang() || 'en';

    this.phoneProvider = new providers.PhoneAuthProvider(auth.auth);

    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user = user;

        this.emailVerified = user.emailVerified;

        db.object(`Users/${user.uid}`).query.once('value').then(items => {
          this.userData = new User().fromSnapshot(items);
          this.generatingApiKey = this.userData.apiKey !== null;

          /* This Is Because the original Accounts created in TOA didn't have the name saved in the firebase account data */
          if (items.val()['fullName'] && (!this.user.displayName || this.user.displayName === '')) {
            this.user.updateProfile({displayName: items.val()['fullName'], photoURL: this.user.photoURL}).then(() => {}).catch(error => console.log(error));
          }

          this.teams = [];
          this.events = [];

          for (const key of this.userData.getFavTeams()) {
            this.ftc.getTeamBasic(key).then((team: Team) => {
              if (team) {
                this.teams.push(team);
                this.teams = new TeamSorter().sort(this.teams);
              }
            });
          }

          for (const key of this.userData.getFavEvents()) {
            this.ftc.getEventBasic(key).then((event: Event) => {
              if (event) {
                this.events.push(event);
                this.events = new EventSorter().sort(this.events);
              }
            });
          }

          for (const key of this.userData.getAdminEvents()) {
            db.object(`eventAPIs/${key}`).snapshotChanges()
              .subscribe(item => {
              this.adminEvents[key] = item.payload.val() || null;
            });
          }

          if (this.userData.level >= 6) {
            this.cloud.allUsers(this.user).then((data) => {
              this.users = data;
            });
          }

          for (const provider of this.user.providerData) {
            if (provider.photoURL != null) {
              this.profileUrl = provider.photoURL;
              break;
            }
          }

          if (this.profileUrl === null && this.userData['profileImage'] != null) {
            const storageRef = this.storage.ref(`images/users/${ this.userData['profileImage'] }`);
            storageRef.getDownloadURL().toPromise().then((url) => {
              this.profileUrl = url;
            });
          }

          this.loaded = true;
        });
      } else {
        this.router.navigateByUrl('/account/login');
      }
    });
  }

  ngOnInit() {
    this.appBarService.setTitle('myTOA', true);
    this.ftc.getAllRegions().then((data: Region[]) => {
      this.regions = data;
      this.currentRegion = this.regions[0];
    });
    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data.reverse();
      this.currentSeason = this.seasons[0];
    });
    this.ftc.getAllEventTypes().then((data: EventType[]) => {
      this.eventTypes = data;
      this.currentEventType = this.eventTypes[0];
    });
    initFbApp(environment.firebase);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {

  }

  checkProvider(providerId: string, user: any) {
    for (const provider of user.providerData) {
      if (provider.providerId.toLowerCase() === providerId.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  selectUser(user: firebase.User) {
    this.db.object(`Users/${user.uid}`).query.once('value').then(items => {
      this.selectedUser = new User().fromSnapshot(items);
      this.selectedUser.firebaseUser = user;
    });
  }

  onSeasonChange(event: {index: any, value: any}) {
    this.currentSeason = this.seasons[event.index - 1];
  }

  onRegionChange(event: {index: any, value: any}) {
    this.currentRegion = this.regions[event.index - 1];
  }

  onEventTypeChange(event: {index: any, value: any}) {
    this.currentEventType = this.eventTypes[event.index - 1];
  }

  resetAdvanced() {
    this.numberAlliances.value = 4;
    this.numberFields.value = 2;
    this.advSpots.value = '';
    this.advEvent.value = '';

    this.numberAlliances.disabled = true;
    this.numberFields.disabled = true;
    this.advSpots.disabled = true;
    this.advEvent.disabled = true;

    this.numberAlliances.disabled = false;
    this.numberFields.disabled = false;
    this.advSpots.disabled = false;
    this.advEvent.disabled = false;
  }

  resetDualDivision() {
    this.divisionNumber.value = 0;
    this.divisionName.value = '';

    this.divisionNumber.disabled = true;
    this.divisionName.disabled = true;

    this.divisionNumber.disabled = false;
    this.divisionName.disabled = false;
  }

  getDebugInput(title: string) {
    const input = prompt(title, '');
    if (input === null || input.trim() === '' || input === undefined) {
      return this.getDebugInput(title);
    } else {
      return input;
    }
  }

  renderCaptcha() {
    this.showCaptcha = true;
    this.recaptchaVerifier = new providers.RecaptchaVerifier('recaptcha', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.linkPhone();
      }});
    this.recaptchaVerifier.render().then((result) => { }).catch( (error) => { console.error(error); });
  }

  linkPhone() {
    const phoneNumber = this.getDebugInput('Enter your phone number');
    let confResult;
    this.user.linkWithPhoneNumber(phoneNumber, this.recaptchaVerifier).then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message
      confResult = confirmationResult;
      return this.getDebugInput('Please enter the confirmation code sent to your phone');
    }).then((code) => {
      return confResult.confirm(code);
    }).then((result) => { /*
      return this.db.object(`Users/${this.user.uid}/phone`).set(phoneNumber.substr(1));
    }).then( (resp) => { */
      return this.db.object(`Phones/${phoneNumber.substr(1)}/uid`).set(`${this.user.uid}`);
    }).then( (resp) => {
      this.translate.get('pages.account.success_link', {name: this.getProviderName(this.phoneProvider)}).subscribe((res: string) => {
        this.snackbar.open(res)
      });
    }).catch( (error) => {
      // Error; SMS not sent
      console.log(error);
      this.showSnackbar('general.error_occurred');
    });
    this.showCaptcha = false;
  }

  createEvent() {
    const event = new Event;
    event.eventKey = this.currentSeason.seasonKey + '-' + this.currentRegion.regionKey + '-' + this.eventId.value;
    event.seasonKey = this.currentSeason.seasonKey;
    event.regionKey = this.currentRegion.regionKey;
    event.eventCode = this.eventId.value;
    event.eventTypeKey = this.currentEventType.eventTypeKey;
    event.eventName = this.eventName.value;
    event.divisionKey = (this.divisionNumber) ? this.divisionNumber.value : 0;
    event.divisionName = (this.divisionName) ? this.divisionName.value : undefined;
    event.fieldCount = (this.numberFields) ? this.numberFields.value : 2;
    event.allianceCount = (this.numberAlliances) ? this.numberAlliances.value : 4;
    event.advanceSpots = (this.advSpots) ? this.advSpots.value : undefined;
    event.advanceEvent = (this.advEvent) ? this.advEvent.value : undefined;
    event.activeTournamentLevel = '0';
    event.startDate = this.startDate.value;
    event.endDate = this.endDate.value;
    event.weekKey = this.dateToMonth(this.startDate.value);
    event.city = this.city.value;
    event.stateProv = this.state.value;
    event.country = this.country.value;
    event.venue = this.venue.value;
    event.isPublic = true;

    this.cloud.createEvent(this.user, [event.toJSON()]).then((data: {}) => {
      this.showSnackbar('pages.account.create_event_card.success', null, null, event.eventKey);
    }, (err) => {
      this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
    });
  }

  dateToMonth(date: number): string {
    const month = date.toString().split('-')[1];
    switch (parseInt(month, 10)) {
      case 1: return 'January';
      case 2: return 'February';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'August';
      case 9: return 'September';
      case 10: return 'October';
      case 11: return 'November';
      case 12: return 'December';
    }
  }

  dumpGeneralCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    this.cloud.dumpCache(this.user, this.generalCache).then(() => {
      // Show Success
      this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
        this.snackbar.open(str);
      });
    }).catch((err) => {
      // Show Fail
      console.log(err);
      this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
    });
  }

  dumpEventCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    const key: string = this.eventCache.value;
    if (key && key.length > 0) {
      Promise.all([
        this.cloud.dumpCache(this.user, `event/${key}`),
        this.cloud.dumpCache(this.user, `event/${key}/matches`),
        this.cloud.dumpCache(this.user, `event/${key}/matches/details`),
        this.cloud.dumpCache(this.user, `event/${key}/matches/participants`),
        this.cloud.dumpCache(this.user, `event/${key}/rankings`),
        this.cloud.dumpCache(this.user, `event/${key}/streams`),
        this.cloud.dumpCache(this.user, `event/${key}/teams`),
        this.cloud.dumpCache(this.user, `event/${key}/awards`),
        this.cloud.dumpCache(this.user, `event/${key}/media`)
      ]).then(() => {
        // Show Success
        this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
          this.snackbar.open(str);
        });
      }).catch((err) => {
        // Show Fail
        console.log(err);
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('general.error_occurred', 'NULL-KEY');
    }
  }

  dumpTeamCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    const key: string = this.teamCache.value;
    if (key && key.length > 0) {
      const promises = [
        this.cloud.dumpCache(this.user, `team/${key}`),
        this.cloud.dumpCache(this.user, `team/${key}/wlt`)
      ];
      for (const season of this.ftc.allYears) {
        promises.push(this.cloud.dumpCache(this.user, `team/${key}/events/${season}`));
        promises.push(this.cloud.dumpCache(this.user, `team/${key}/matches/${season}`));
        promises.push(this.cloud.dumpCache(this.user, `team/${key}/awards/${season}`));
        promises.push(this.cloud.dumpCache(this.user, `team/${key}/results/${season}`));
        promises.push(this.cloud.dumpCache(this.user, `team/${key}/media/${season}`));
      }
      Promise.all(promises).then(() => {
        // Show Success
        this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
          this.snackbar.open(str);
        });
      }).catch((err) => {
        // Show Fail
        console.log(err);
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('general.error_occurred', 'NULL-KEY');
    }
  }

  dumpMatchCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    const key: string = this.matchCache.value;
    if (key && key.length > 0) {
      Promise.all([
        this.cloud.dumpCache(this.user, `match/${key}`),
        this.cloud.dumpCache(this.user, `match/${key}/details`),
        this.cloud.dumpCache(this.user, `match/${key}/participants`)
      ]).then(() => {
        // Show Success
        this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
          this.snackbar.open(str);
        });
      }).catch((err) => {
        // Show Fail
        console.log(err);
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('general.error_occurred', 'NULL-KEY');
    }
  }

  signOut(): void {
    this.auth.auth.signOut().then(() => {
      this.router.navigateByUrl('/account/login');
    });
  }

  generateApiKey(): void {
    if (this.emailVerified) {
      this.generatingApiKey = true;
      this.cloud.generateApiKey(this.user).catch(console.log);
    }
  }

  generateEventApiKey(eventKey: string): void {
    this.cloud.generateEventApiKey(this.user, eventKey).then(() => {
      this.generatingEventApiKey = false;
    }, (err) => {
      this.generatingEventApiKey = false;
    }).catch(console.log);
  }

  getAdminEvents(): string[] {
    return Object.keys(this.adminEvents);
  }

  sendEmailVerification() {
    this.user.sendEmailVerification().then(() => {
      // Show Success
      this.translate.get('pages.event.subpages.admin.success_sent_verify_email').subscribe((success_sent: string) => {
        this.snackbar.open(success_sent);
      });
    }).catch((error) => {
      // Show Fail
      console.log(error);
      this.translate.get('general.error_occurred').subscribe((error_string: string) => {
        this.snackbar.open(error_string);
      });
    });
  }

  sendPasswordResetEmail() {
    this.auth.auth.sendPasswordResetEmail(this.user.email).then( () => {
      // Show success in snackbar
      this.translate.get('pages.account.reset_password_email').subscribe((res: string) => {
        this.snackbar.open(res)
      });
    }).catch( error => {
      // Show Error in snackbar
      this.translate.get('general.error_occurred').subscribe((res: string) => {
        console.log(error);
        this.snackbar.open(res)
      });
    })
  }

  isUserLinkToProvider(provider: firebase.auth.AuthProvider): boolean {
    for (const cProvider of this.user.providerData) {
      if (cProvider.providerId === provider.providerId) {
        return true;
      }
    }
    return false;
  }

  linkProvider(provider: firebase.auth.AuthProvider) {
    this.user.linkWithPopup(provider).then(result => {
      // Accounts successfully linked.
      const credential = result.credential;
      const user = result.user;

      // Show success in snackbar
      this.translate.get('pages.account.success_link', {name: this.getProviderName(provider)}).subscribe((res: string) => {
        this.snackbar.open(res)
      });
    }).catch(error => {
      this.translate.get('general.error_occurred').subscribe((res: string) => {
        console.log(error);
        this.snackbar.open(res)
      });
    });
  }

  unlinkProvider(provider: firebase.auth.AuthProvider) {
    // Don't leave the user without any provider
    const phoneNumber = this.user.phoneNumber;
    if (this.user.providerData.length > 1) {
      this.user.unlink(provider.providerId).then(result => {
        if (provider.providerId.indexOf('hone') > -1) {
          this.db.object(`Phones/${phoneNumber.substr(1)}/uid`).remove();
        }
        // Show success in snackbar
        this.translate.get('pages.account.success_unlink', {name: this.getProviderName(provider)}).subscribe((res: string) => {
          this.snackbar.open(res)
        });
      }).catch(error => {
        this.translate.get('general.error_occurred').subscribe((res: string) => {
          console.log(error);
          this.snackbar.open(res)
        });
      });
    } else {
      this.translate.get('general.error_occurred').subscribe((res: string) => {
        this.snackbar.open(res)
      });
    }
  }

  getProviderName(provider: firebase.auth.AuthProvider) {
    let name: string = provider.providerId;
    name = name.replace('.com', '');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
  }

  sendAnalytic(category, label, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: 10
    });
  }

  showSnackbar(translateKey: string, errorKey?: string, value?: number, eventKey?: string) {
    const isEmail = (errorKey) ? errorKey.indexOf('428') > -1 : undefined;
    const msg = (isEmail) ? 'pages.event.subpages.admin.verify_email' : translateKey;

    this.translate.get(msg, {value: value}).subscribe((res: string) => {

      const message = (errorKey && !isEmail) ? `${res} (${errorKey})` : res;

      const snackBarRef = this.snackbar.open(message, (isEmail) ? 'Verify' : (eventKey) ? 'Go' : null);

      snackBarRef.afterDismiss().subscribe(reason => {
        if (reason === 'action') {
          if (isEmail) {
            this.user.sendEmailVerification().then(() => {
              this.showSnackbar(`pages.event.subpages.admin.success_sent_verify_email`);
            }).catch((err) => {
              this.showSnackbar(`general.error_occurred`, `HTTP-${err.status}`);
            })
          } else if (eventKey) {
            this.router.navigateByUrl('/events/' + eventKey);
          }
        }
      });
    });
  }

  changeUrlNoRoute(route: any) {
    this.loca.go(`account/${route}`);
  }
}
