import { Component, OnInit } from '@angular/core';
import { AppBarService } from '../../app-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { CloudFunctions } from '../../providers/cloud-functions';
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
import Alliance from '../../models/Alliance';
import EventInsights from '../../models/Insights';
import { DialogEventFavorite } from '../../dialogs/event-favorite/dialog-event-favorite';
import { MdcDialog } from '@angular-mdc/web';

@Component({
  providers: [FTCDatabase, TheOrangeAllianceGlobals],
  selector: 'toa-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventTypes: any;

  eventKey: string;
  eventData: Event;
  eventTypeName: string;
  eventSeasonName: string;
  matchesPerTeam: number;
  stream: EventLiveStream;
  alliances: Alliance[];
  qualInsights: EventInsights = null;
  elimInsights: EventInsights = null;
  media: Media[];
  divisions: Event[] = [];

  activeTab = -1;
  totalmedia = 0;
  totalteams: any;
  totalmatches: any;
  totalrankings: any;
  totalalliances: any;
  totalawards: any;

  user: User = null;
  emailVerified = true;
  admin: boolean;
  toaAdmin = false;
  userSettings: any;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals, private dialog: MdcDialog,
              public db: AngularFireDatabase, public auth: AngularFireAuth, private appBarService: AppBarService, private cloud: CloudFunctions) {
    this.eventKey = this.route.snapshot.params['event_key'];
  }

  ngOnInit() {
    if (this.eventKey) {
      this.auth.authState.subscribe(user => {
        if (user !== null && user !== undefined) {
          this.user = user;

          this.cloud.getEventSettings(this.user, this.eventKey).then((data: any) => {
            this.userSettings = data;

            this.toaAdmin = this.userSettings.admin === 'toa-admin';
            this.admin = this.toaAdmin || this.userSettings.admin === 'event-admin';

            if (this.admin && this.totalrankings === 0 && this.totalalliances === 0 && this.totalmatches === 0 &&
              this.totalteams === 0 && this.totalawards === 0 && this.totalmedia === 0) {
              this.select('admin');
            }
          });
        }
      });

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
          this.totalalliances = this.eventData.alliances.length;
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

          this.ftc.getEventInsights(this.eventKey, 'quals').then((insights) => {
            this.qualInsights = insights;
          }).catch((error) => console.log('Qual Insights Failed to Load'));
          this.ftc.getEventInsights(this.eventKey, 'elims').then((insights) => {
            this.elimInsights = insights;
            console.log(this.elimInsights);
          }).catch((error) => console.log('Elim Insights Failed to Load'));

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
            const seasonObj = seasons.filter(obj => obj.seasonKey === this.eventData.seasonKey);
            if (seasonObj && seasonObj.length === 1 && seasonObj[0] && seasonObj[0].description) {
              this.eventSeasonName = seasonObj[0].description;
            }
          }, (err) => {
            console.log(err);
          });

          // Find matches per team                           // Can't divide by 0
          if (this.eventData.matches && this.eventData.teams && this.eventData.teams.length > 0) {
            let matches = 0;
            let surrogateTeams = 0;
            for (const match of this.eventData.matches) {
              if (match.tournamentLevel === 1 && match.participants.length === 4) {
                matches++;
                for (const participant of match.participants) {
                  if (participant.stationStatus === 0) {
                    surrogateTeams++;
                  }
                }
              }
            }
            const number = ((matches * 4) - surrogateTeams) / this.eventData.teams.length;
            if (number === 6 || number === 5) {
              this.matchesPerTeam = number;
            }
          }


          // Search division in the same Event
          if (this.eventData.divisionName && this.eventData.divisionKey <= 2) {
            const eventKey = this.eventData.eventKey.substr(0, this.eventData.eventKey.length - 1); // Remove division key
            const divisions = [0, 1, 2].filter(item => item !== this.eventData.divisionKey);
            if (divisions.length === 2) {
              divisions.forEach((division) => {
                this.ftc.getEventBasic(eventKey + division).then((eventData: Event) => {
                  if (eventData.eventName === this.eventData.eventName && eventData.divisionName !== this.eventData.divisionName) {
                    if (this.divisions.length === 0) {
                      this.divisions.push(this.eventData);
                    }
                    this.divisions.push(eventData);
                    this.divisions.sort((a, b) => {
                      const division1 = a.divisionKey;
                      const division2 = b.divisionKey;
                      return (division1 > division2) ? 1 : ((division2 > division1) ? -1 : 0);
                    })
                  }
                })
              });
            }
          }

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
      case 'alliances':
        this.activeTab = 3;
        break;
      case 'awards':
        this.activeTab = 4;
        break;
      case 'insights':
        this.activeTab = 5;
        break;
      case 'media':
        this.activeTab = 6;
        break;
      case 'admin':
        this.activeTab = 7;
        break;
    }
  }

  public hasEventEnded(): boolean {
    const today = new Date();
    const diff = (new Date(this.eventData.endDate).valueOf() - today.valueOf()) / 1000 / 60 / 60; // Convert milliseconds to hours
    return diff < -24; // 24 hours extra
  }

  openEvent(event: Event) {
    this.router.navigate(['/events', event.eventKey]);
  }

  openEventSettings() {
    this.dialog.open(DialogEventFavorite, {
      scrollable: true,
      data: {
        'settings': this.userSettings,
        'eventKey': this.eventKey,
        'user': this.user
      }
    });
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
