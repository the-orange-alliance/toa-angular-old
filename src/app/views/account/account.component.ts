import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FTCDatabase } from '../../providers/ftc-database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { TeamSorter } from '../../util/team-utils';
import { EventSorter } from '../../util/event-utils';
import { CloudFunctions } from '../../providers/cloud-functions';
import Team from '../../models/Team';
import Event from '../../models/Event';

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

  constructor(private app: TheOrangeAllianceGlobals, private router: Router, private ftc: FTCDatabase, private httpClient: HttpClient,
              db: AngularFireDatabase, public auth: AngularFireAuth, private storage: AngularFireStorage, private cloud: CloudFunctions) {

    this.app.setTitle('myTOA');
    this.app.setDescription('Your myTOA account overview');

    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user = {
          'email': user.email,
          'uid': user.uid
        };
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
                  this.ftc.getTeamBasic(parseInt(key)).then((team: Team) => {
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

  sendAnalytic(category, label, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: 10
    });
  }
}
