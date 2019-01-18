import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FTCDatabase } from '../../providers/ftc-database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { TeamSorter } from '../../util/team-utils';
import { EventSorter } from '../../util/event-utils';
import { CloudFunctions } from '../../providers/cloud-functions';
import Team from '../../models/Team';
import Event from '../../models/Event';
import { MdcSnackbar } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { auth as providers } from 'firebase';

@Component({
  selector: 'toa-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [CloudFunctions, TheOrangeAllianceGlobals]
})

export class AccountComponent {

  user: firebase.User = null;
  userData: {} = {};
  adminEvents = {};
  profileUrl: string = null;

  teams: Team[];
  events: Event[];

  loaded: boolean;
  generatingApiKey: boolean;
  generatingEventApiKey: boolean;
  emailVerified = true;

  googleProvider = new providers.GoogleAuthProvider();
  githubProvider = new providers.GithubAuthProvider();

  constructor(private app: TheOrangeAllianceGlobals, private router: Router, private ftc: FTCDatabase, private httpClient: HttpClient, private snackbar: MdcSnackbar,
              db: AngularFireDatabase, public auth: AngularFireAuth, private storage: AngularFireStorage, private cloud: CloudFunctions, private translate: TranslateService) {

    this.app.setTitle('myTOA');
    this.app.setDescription('Your myTOA account overview');

    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user = user;

        this.emailVerified = user.emailVerified;

        db.list(`Users/${user.uid}`).snapshotChanges()
          .subscribe(items => {

            items.forEach(element => {
              this.userData[element.key] = element.payload.val();
            });

            this.generatingApiKey = user['APIKey'];

            if (!this.loaded) {
              this.teams = [];
              this.events = [];

              const teams = this.userData['favTeams'];
              for (const key in teams) {
                if (teams[key] === true) {
                  this.ftc.getTeamBasic(key).then((team: Team) => {
                    if (team) {
                      this.teams.push(team);
                      this.teams = new TeamSorter().sort(this.teams);
                    }
                  });
                }
              }

              const events = this.userData['favEvents'];
              for (const key in events) {
                if (events[key] === true) {
                  this.ftc.getEventBasic(key).then((event: Event) => {
                    if (event) {
                      this.events.push(event);
                      this.events = new EventSorter().sort(this.events);
                    }
                  });
                }
              }

              this.loaded = true;
            }

            const adminEvents = this.userData['adminEvents'];
            if (adminEvents) {
              for (const key in adminEvents) {
                if (adminEvents[key] === true) {
                  db.object(`eventAPIs/${key}`).snapshotChanges()
                    .subscribe(item => {
                    this.adminEvents[key] = item.payload.val() || null;
                  });
                }
              }
            }

            for (let provider of this.user.providerData) {
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
          });
      } else {
        this.router.navigateByUrl('/account/login');
      }
    });
  }

  signOut(): void {
    this.auth.auth.signOut().then(() => {
      this.router.navigateByUrl('/account/login');
    });
  }

  generateApiKey(): void {
    if (this.emailVerified) {
      this.generatingApiKey = true;
      this.cloud.generateApiKey(this.user['uid']).catch(console.log);
    }
  }

  generateEventApiKey(eventKey: string): void {
    this.cloud.generateEventApiKey(this.user['uid'], eventKey).then(() => {
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
    for (let cProvider of this.user.providerData) {
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
    if (this.user.providerData.length > 1) {
      this.user.unlink(provider.providerId).then(result => {
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
}
