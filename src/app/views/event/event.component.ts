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
  event_types: any;

  event_key: string;
  event_data: Event;
  event_type_name: string;
  event_season_name: string;
  totalmedia: number = 0;
  totalteams: any;
  totalmatches: any;
  totalrankings: any;
  totalawards: any;
  view_type: string;
  stream: EventLiveStream;
  media: Media[];

  user: User = null;
  favorite: boolean;
  emailVerified: boolean = true;
  admin: boolean;
  toaAdmin: boolean;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals,
              public db: AngularFireDatabase, public auth: AngularFireAuth, private appBarService: AppBarService) {
    this.event_key = this.route.snapshot.params['event_key'];

    auth.authState.subscribe(user => {
        if (user !== null && user !== undefined) {
          this.user = user;
          db.object(`Users/${user.uid}/favEvents/${this.event_key}`).query.once('value').then(item => {
            this.favorite = item !== null && item.val() === true;
          });

          // Is event admin?
          this.emailVerified = this.user.emailVerified;
          db.object(`Users/${user.uid}/adminEvents/${this.event_key}`).query.once('value').then(item => {
            this.admin = item !== null && item.val() === true;
              // Is TOA admin?
              db.object(`Users/${user.uid}/level`).query.once('value').then(i => {
                if (!this.admin) {
                  this.admin = i.val() >= 6;
                }
                this.toaAdmin = false;
                this.toaAdmin = (i.val() >= 6);
              });
          });
        }
      });
  }

  ngOnInit() {
    if (this.event_key) {
      this.ftc.getEvent(this.event_key).then((data: Event) => {
        if (data) {
          this.event_data = data;

          this.app.setTitle(this.event_data.eventName);
          this.app.setDescription(`Event results for the ${new Date(this.event_data.startDate).getFullYear()} ${this.event_data.eventName} FIRST Tech Challenge in ${this.event_data.stateProv ? this.event_data.stateProv + ', ' + this.event_data.country : this.event_data.country }`);
          this.appBarService.setTitle(new Date(this.event_data.startDate).getFullYear() + ' ' + this.event_data.eventName, true);

          if (this.event_data.rankings && this.event_data.rankings.length > 0) {
            this.select('rankings');
          } else if (this.event_data.matches && this.event_data.matches.length > 0) {
            this.select('matches')
          } else {
            this.select('teams');
          }

          if (this.event_data.matches) {
            this.event_data.matches = new MatchSorter().sort(this.event_data.matches, 0, this.event_data.matches.length - 1);
          }

          if (this.event_data.awards) {
            this.event_data.awards = new AwardSorter().sort(this.event_data.awards);
          }

          if (this.event_data.teams) {
            this.event_data.teams = new TeamSorter().sortEventParticipant(this.event_data.teams);
          }

          this.totalteams = this.event_data.teams.length;
          this.totalmatches = this.event_data.matches.length;
          this.totalrankings = this.event_data.rankings.length;
          this.totalawards = this.event_data.awards.length;

          this.ftc.getEventStreams(this.event_key).then((data: EventLiveStream[]) => {
            if (data && data.length > 0) {
              this.stream = data[0];
            }
          });

          this.ftc.getEventMedia(this.event_key).then((data: Media[]) => {
            this.media = data;
            if (this.media && this.media.length > 0 && !this.hasEventEnded()) {
              this.totalmedia = this.media.length;
              this.select('media');
            }
          });

          this.ftc.getEventTypes().then((types: EventType[]) => {
            this.event_types = types;
            const typeObj = this.event_types.filter(obj => obj.eventTypeKey === this.event_data.eventTypeKey);
            if (typeObj && typeObj[0] && typeObj[0].description) {
              this.event_type_name = typeObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });

          this.ftc.getAllSeasons().then((seasons: Season[]) => {
            this.seasons = seasons;
            const seasonObj = this.seasons.filter(obj => obj.seasonKey === this.event_data.seasonKey);
            if (seasonObj && seasonObj.length === 1 && seasonObj[0] && seasonObj[0].description) {
              this.event_season_name = seasonObj[0].description;
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

  public select(view_type) {
    this.view_type = view_type;
  }

  public isSelected(view_type): boolean {
    return this.view_type === view_type;
  }

  toggleEvent(): void {
    if (this.favorite) { // Remove from favorites
      this.db.object(`Users/${this.user.uid}/favEvents/${this.event_key}`).remove();
      this.db.object(`Users/${this.user.uid}/favEvents/${this.event_key}`).query.once('value').then(items => {
        this.favorite = items !== null && items.val() === true
        });
    } else { // Add to favorites
      this.db.object(`Users/${this.user.uid}/favEvents/${this.event_key}`).set(true);
      this.db.object(`Users/${this.user.uid}/favEvents/${this.event_key}`).query.once('value').then(items => {
        this.favorite = items !== null && items.val() === true
        });
    }
  }

  public hasEventEnded(): boolean {
    const today = new Date();
    const diff = (new Date(this.event_data.endDate).valueOf() - today.valueOf()) / 1000 / 60 / 60; // Convert milliseconds to hours
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
