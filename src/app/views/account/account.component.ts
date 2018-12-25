import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FTCDatabase } from '../../providers/ftc-database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { TeamSorter } from '../../util/team-utils';
import { EventSorter } from '../../util/event-utils';
import Team from '../../models/Team';
import Event from '../../models/Event';

@Component({
  selector: 'toa-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [TheOrangeAllianceGlobals]
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
              db: AngularFireDatabase, public auth: AngularFireAuth, private storage: AngularFireStorage) {

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

              let teams = this.user['favTeams'];
              for (let key in teams) {
                if (teams[key] === true) {
                  this.ftc.getTeamBasic(key).then((team: Team) => {
                    if (team) {
                      this.teams.push(team);
                      this.teams = new TeamSorter().sort(this.teams);
                    }
                  });
                }
              }

              let events = this.user['favEvents'];
              for (let key in events) {
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

            let adminEvents = this.user['adminEvents'];
            if (adminEvents){
              for (let key in adminEvents) {
                if (adminEvents[key] === true) {
                  db.object(`eventAPIs/${key}`).snapshotChanges()
                    .subscribe(item => {
                    this.adminEvents[key] = item.payload.val() || null;
                  });
                }
              }
            }

            if (this.user['profileImage'] != null){
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
      this.router.navigateByUrl("/account/login");
    });
  }

  generateApiKey(): void {
    this.generatingApiKey = true;
    const authHeader = new HttpHeaders({
      'authorization': 'Bearer ' + this.user['uid'],
      'Access-Control-Allow-Origin': '*'
    });
    this.httpClient.get('https://us-central1-the-orange-alliance.cloudfunctions.net/requireValidations/generateKey', { headers: authHeader })
      .toPromise()
      .catch(console.log);
  }

  generateEventApiKey(eventKey: string): void {
    this.generatingEventApiKey = true;
    const authHeader = new HttpHeaders({
      'authorization': 'Bearer ' + this.user['uid'],
      'data': eventKey,
      'Access-Control-Allow-Origin': '*'
    });
    this.httpClient.get('https://us-central1-the-orange-alliance.cloudfunctions.net/requireValidations/eventKey', { headers: authHeader })
      .toPromise()
      .then(() => {
        this.generatingEventApiKey = false;
      }, (err) => {
        this.generatingEventApiKey = false;
      })
      .catch(console.log);
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
