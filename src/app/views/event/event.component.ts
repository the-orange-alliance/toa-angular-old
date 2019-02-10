import { Component, OnInit } from '@angular/core';
import { AppBarService } from '../../app-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TeamSorter } from '../../util/team-utils';
import { AwardSorter } from '../../util/award-utils';
import { MatchSorter } from '../../util/match-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase/app';
import Event from '../../models/Event';
import EventType from '../../models/EventType';
import Season from '../../models/Season';
import EventLiveStream from '../../models/EventLiveStream';
import Media from '../../models/Media';

@Component({
  providers: [FTCDatabase, TheOrangeAllianceGlobals],
  selector: 'toa-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  seasons: any;
  eventTypes: any;

  eventKey: string;
  eventData: Event;
  eventTypeName: string;
  eventSeasonName: string;
  stream: EventLiveStream;
  media: Media[];

  activeTab: number = -1;
  totalmedia: number = 0;
  totalteams: any;
  totalmatches: any;
  totalrankings: any;
  totalawards: any;

  user: User = null;
  favorite: boolean;
  emailVerified: boolean = true;
  admin: boolean;
  toaAdmin: boolean;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals,
              public db: AngularFireDatabase, public auth: AngularFireAuth, private appBarService: AppBarService) {
    this.eventKey = this.route.snapshot.params['event_key'];

    auth.authState.subscribe(user => {
        if (user !== null && user !== undefined) {
          this.user = user;
          db.object(`Users/${user.uid}/favEvents/${this.eventKey}`).query.once('value').then(item => {
            this.favorite = item !== null && item.val() === true;
          });

          // Is event admin?
          this.emailVerified = this.user.emailVerified;
          db.object(`Users/${user.uid}/adminEvents/${this.eventKey}`).query.once('value').then(item => {
            this.admin = item !== null && item.val() === true;
              // Is TOA admin?
              db.object(`Users/${user.uid}/level`).query.once('value').then(i => {
                if (!this.admin) {
                  this.admin = i.val() >= 6;
                }
                this.toaAdmin = false;
                this.toaAdmin = (i.val() >= 6);
              });
            if (this.admin && this.totalrankings === 0 && this.totalmatches === 0 &&
                this.totalteams === 0 && this.totalawards === 0 && this.totalmedia === 0) {
              this.select('admin');
            }
          });
        }
      });
  }

  ngOnInit() {
    if (this.eventKey) {
      this.ftc.getEvent(this.eventKey).then((data: Event) => {
        if (data) {
          this.eventData = data;

          this.app.setTitle(this.eventData.eventName);
          let appDesc = `Event results for the ${new Date(this.eventData.startDate).getFullYear()} ${this.eventData.eventName} FIRST Tech Challenge in `;
          appDesc = appDesc + `${this.eventData.stateProv ? this.eventData.stateProv + ', ' + this.eventData.country : this.eventData.country }`;
          this.app.setDescription(appDesc);
          this.appBarService.setTitle(new Date(this.eventData.startDate).getFullYear() + ' ' + this.eventData.eventName, true);

          if (this.eventData.matches) {
            this.eventData.matches = new MatchSorter().sort(this.eventData.matches, 0, this.eventData.matches.length - 1);
          }

          if (this.eventData.awards) {
            this.eventData.awards = new AwardSorter().sort(this.eventData.awards);
          }

          if (this.eventData.teams) {
            this.eventData.teams = new TeamSorter().sortEventParticipant(this.eventData.teams);
          }

          if (this.eventData.rankings && this.eventData.rankings.length > 0) {
            this.select('rankings');
          } else if (this.eventData.matches && this.eventData.matches.length > 0) {
            this.select('matches')
          } else {
            this.select('teams');
          }

          this.totalteams = this.eventData.teams.length;
          this.totalmatches = this.eventData.matches.length;
          this.totalrankings = this.eventData.rankings.length;
          this.totalawards = this.eventData.awards.length;

          this.ftc.getEventStreams(this.eventKey).then((eventLiveStream: EventLiveStream[]) => {
            if (eventLiveStream && eventLiveStream.length > 0) {
              this.stream = eventLiveStream[0];
            }
          });

          this.ftc.getEventMedia(this.eventKey).then((eventMedia: Media[]) => {
            this.media = eventMedia;
            if (this.media && this.media.length > 0 && !this.hasEventEnded()) {
              this.totalmedia = this.media.length;
              if (this.totalteams === 0 && this.totalmatches === 0 && this.totalrankings === 0 && this.totalawards === 0) {
                this.select('media');
              }
            }
          });

          this.ftc.getEventTypes().then((types: EventType[]) => {
            this.eventTypes = types;
            const typeObj = this.eventTypes.filter(obj => obj.eventTypeKey === this.eventData.eventTypeKey);
            if (typeObj && typeObj[0] && typeObj[0].description) {
              this.eventTypeName = typeObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });

          this.ftc.getAllSeasons().then((seasons: Season[]) => {
            this.seasons = seasons;
            const seasonObj = this.seasons.filter(obj => obj.seasonKey === this.eventData.seasonKey);
            if (seasonObj && seasonObj.length === 1 && seasonObj[0] && seasonObj[0].description) {
              this.eventSeasonName = seasonObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });

        } else {
          this.router.navigate(['/not-found']);
        }
      }, (err) => {
        console.log(err);
        // this.router.navigate(['/not-found']);
      })
      }
  }

  public select(view: string) {
    switch (view) {
      case 'rankings':
        this.activeTab = 0;
        break;
      case 'matches':
        this.activeTab = 1;
        break;
      case 'teams':
        this.activeTab = 2;
        break;
      case 'awards':
        this.activeTab = 3;
        break;
      case 'media':
        this.activeTab = 4;
        break;
      case 'admin':
        this.activeTab = 5;
        break;
    }
  }

  toggleEvent(): void {
    if (this.favorite) { // Remove from favorites
      this.db.object(`Users/${this.user.uid}/favEvents/${this.eventKey}`).remove();
      this.db.object(`Users/${this.user.uid}/favEvents/${this.eventKey}`).query.once('value').then(items => {
        this.favorite = items !== null && items.val() === true
        });
    } else { // Add to favorites
      this.db.object(`Users/${this.user.uid}/favEvents/${this.eventKey}`).set(true);
      this.db.object(`Users/${this.user.uid}/favEvents/${this.eventKey}`).query.once('value').then(items => {
        this.favorite = items !== null && items.val() === true
        });
    }
  }

  public hasEventEnded(): boolean {
    const today = new Date();
    const diff = (new Date(this.eventData.endDate).valueOf() - today.valueOf()) / 1000 / 60 / 60; // Convert milliseconds to hours
    return diff < -24; // 24 hours extra
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
