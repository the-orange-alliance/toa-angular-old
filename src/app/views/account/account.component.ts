import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { Router } from "@angular/router";
import { FTCDatabase } from "../../providers/ftc-database";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import {Observable} from 'rxjs/Rx';
import { TeamSorter } from "../../util/team-utils";
import { EventSorter } from "../../util/event-utils";
import Team from "../../models/Team";
import Event from "../../models/Event";

@Component({
  selector: 'toa-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [TheOrangeAllianceGlobals]
})

export class AccountComponent {

  user = [];

  teams: Team[];
  events: Event[];

  loaded: boolean;

  profileUrl: Observable<string | null>;

  constructor(private app: TheOrangeAllianceGlobals, private router: Router, private ftc: FTCDatabase,
              db: AngularFireDatabase, private storage: AngularFireStorage, public auth: AngularFireAuth) {
    this.app.setTitle('myTOA');
    this.app.setDescription('Watch live FIRST Tech Challenge events')


    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user['email'] = user.email;
        this.user['uid'] = user.uid;
        db.list(`Users/${user.uid}`).snapshotChanges()
          .subscribe(items => {

            if (!this.loaded) {
              this.teams = [];
              this.events = [];

              items.forEach(element => {
                this.user[element.key] = element.payload.val();
              });

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

              if (this.user['profileImage'] != null){
                const storageRef = this.storage.ref(`images/users/${this.user['profileImage']}`);
                this.profileUrl = storageRef.getDownloadURL();
              }else{
                const storageRef = this.storage.ref(`images/users/generic/${String(this.user['fullName']).charAt(0).toLowerCase()}.png`);
                this.profileUrl = storageRef.getDownloadURL();
              }

              this.loaded = true;
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
}
