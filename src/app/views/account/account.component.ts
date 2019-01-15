import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FTCDatabase } from '../../providers/ftc-database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { TeamSorter } from '../../util/team-utils';
import { EventSorter } from '../../util/event-utils';
import { CloudFunctions } from '../../providers/cloud-functions';
import Team from '../../models/Team';
import Event from '../../models/Event';
import { MdcSnackbar } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'toa-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [CloudFunctions, TheOrangeAllianceGlobals]
})

export class AccountComponent {

  user = null;
  adminEvents = {};
  profileUrl: Observable<string | null> = null;

  teams: Team[];
  events: Event[];

  loaded: boolean;
  generatingApiKey: boolean;
  generatingEventApiKey: boolean;

  emailVerified = true;

  constructor(private app: TheOrangeAllianceGlobals, private router: Router, private ftc: FTCDatabase, private httpClient: HttpClient, private snackbar: MdcSnackbar,
              db: AngularFireDatabase, public auth: AngularFireAuth, private storage: AngularFireStorage, private cloud: CloudFunctions, private translate: TranslateService) {

    this.app.setTitle('myTOA');
    this.app.setDescription('Your myTOA account overview');

    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user = {
          'email': user.email,
          'uid': user.uid
        };

        this.emailVerified = user.emailVerified;

        // Request User to verify their email if they haven't already
        if (!user.emailVerified) {
          // User hasn't verified email, prompt them to do it now!
          this.translate.get(`pages.account.no_verify`).subscribe((no_verify: string) => {
            this.translate.get(`general.verify`).subscribe((verify: string) => {
              const snackBarRef = this.snackbar.open(no_verify, verify);

              snackBarRef.afterDismiss().subscribe(reason => {
                if (reason === 'action') {
                  // User Wants to verfy their email. Send it now!
                  user.sendEmailVerification().then(() => {
                    // Show Success
                    this.translate.get(`pages.event.subpages.admin.success_sent_verify_email`).subscribe((success_sent: string) => {
                      this.snackbar.open(success_sent);
                    });
                  }).catch((error) => {
                    // Show Fail
                    console.log(error);
                    this.translate.get(`general.error_occurred`).subscribe((error_string: string) => {
                      this.snackbar.open(error_string);
                    });
                  });
                }
              });
            });
          });
        }


        db.list(`Users/${user.uid}`).snapshotChanges()
          .subscribe(items => {

            items.forEach(element => {
              this.user[element.key] = element.payload.val();
            });

            this.generatingApiKey = user['APIKey'];

            if (!this.loaded) {
              this.teams = [];
              this.events = [];

              const teams = this.user['favTeams'];
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

              const events = this.user['favEvents'];
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

            const adminEvents = this.user['adminEvents'];
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

            if (this.user['profileImage'] != null) {
              const storageRef = this.storage.ref(`images/users/${ this.user['profileImage'] }`);
              this.profileUrl = storageRef.getDownloadURL();
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
    this.generatingApiKey = true;
    this.cloud.generateApiKey(this.user['uid']).catch(console.log);
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

  sendPasswordResetEmail() {
    this.auth.auth.sendPasswordResetEmail(this.user.email).then( () => {
      // Show success in snackbar
      this.translate.get(`pages.account.reset_password_email`).subscribe((res: string) => {
        this.snackbar.open(res)
      });
    }).catch( error => {
      // Show Error in snackbar
      this.translate.get(`general.error_occurred`).subscribe((res: string) => {
        console.log(error);
        this.snackbar.open(res)
      });
    })
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
