import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TeamSorter } from '../../util/team-utils';
import { AwardSorter } from '../../util/award-utils';
import { MatchSorter } from '../../util/match-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import Event from '../../models/Event';
import EventType from '../../models/EventType';
import Season from '../../models/Season';
import EventLiveStream from '../../models/EventLiveStream';

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
  event: Event;
  event_type_name: string;
  event_season_name: string;
  totalteams: any;
  totalmatches: any;
  totalrankings: any;
  totalawards: any;
  view_type: string;
  stream: EventLiveStream;

  user: any = null;
  favorite: boolean;
  admin: boolean;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals,
              public db: AngularFireDatabase, public auth: AngularFireAuth) {
    this.event_key = this.route.snapshot.params['event_key'];

    auth.authState.subscribe(user => {
        if (user !== null && user !== undefined) {
          this.user = user;
          db.object(`Users/${user.uid}/favEvents/${this.event_key}`).query.once('value').then(item => {
            this.favorite = item !== null && item.val() === true;
          });

          // Is event admin?
          db.object(`Users/${user.uid}/adminEvents/${this.event_key}`).query.once('value').then(item => {
            this.admin = item !== null && item.val() === true;

            if (!this.admin) {
              // Is TOA admin?
              db.object(`Users/${user.uid}/level`).query.once('value').then(item => {
                this.admin = item.val() >= 6
              });
            }
          });
        }
      });
  }

  ngOnInit() {
    if (this.event_key) {
      this.ftc.getEvent(this.event_key).then((data: Event) => {
        if (data) {
          this.event = data;

          this.app.setTitle(this.event.eventName);
          this.app.setDescription(`Event results for the ${new Date(this.event.startDate).getFullYear()} ${this.event.eventName} FIRST Tech Challenge in ${this.event.stateProv ? this.event.stateProv + ', ' + this.event.country : this.event.country }`);

          if (this.event.rankings && this.event.rankings.length > 0) {
            this.select('rankings');
          } else if (this.event.matches && this.event.matches.length > 0) {
            this.select('matches')
          } else {
            this.select('teams');
          }

          if (this.event.matches) {
            this.event.matches = new MatchSorter().sort(this.event.matches, 0, this.event.matches.length - 1);
          }

          if (this.event.awards) {
            this.event.awards = new AwardSorter().sort(this.event.awards);
          }

          if (this.event.teams) {
            this.event.teams = new TeamSorter().sortEventParticipant(this.event.teams);
          }

          this.totalteams = this.event.teams.length;
          this.totalmatches = this.event.matches.length;
          this.totalrankings = this.event.rankings.length;
          this.totalawards = this.event.awards.length;

          this.ftc.getEventStreams(this.event_key).then((data: EventLiveStream[]) => {
            if (data && data.length > 0) {
              this.stream = data[0];
            }
          });

          this.ftc.getEventTypes().then((types: EventType[]) => {
            this.event_types = types;
            const typeObj = this.event_types.filter(obj => obj.eventTypeKey === this.event.eventTypeKey);
            if (typeObj && typeObj[0] && typeObj[0].description) {
              this.event_type_name = typeObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });

          this.ftc.getAllSeasons().then((seasons: Season[]) => {
            this.seasons = seasons;
            const seasonObj = this.seasons.filter(obj => obj.seasonKey === this.event.seasonKey);
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

  sendAnalytic(category, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: this.router.url,
      eventAction: action,
      eventValue: 10
    });
  }
}
