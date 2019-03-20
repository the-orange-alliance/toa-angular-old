import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MdcSnackbar, MdcTabBar} from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';
import Event from '../../../../models/Event';
import ModifiedEvent from '../../../../models/ModifiedEvent';
import Team from '../../../../models/Team';
import {FTCDatabase} from '../../../../providers/ftc-database';
import Season from '../../../../models/Season';

@Component({
  selector: 'toa-account-retriever',
  templateUrl: './retriever.component.html',
  styleUrls: ['../../account.component.scss']
})
export class RetrieverComponent implements OnInit {

  @Input() user: User;
  @ViewChild('retr_sel') retrieverSelector: MdcTabBar;

  newEvents: Event[] = null;
  modifiedEvents: ModifiedEvent[] = null;

  newTeams: Team[] = null;
  // modifiedTeams: ModifiedTeam[] = null;

  allSeasons: Season[] = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions,
              private translate: TranslateService, private snackbar: MdcSnackbar, private ftc: FTCDatabase) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Retriever');
    this.cloud.eventsRetriever(this.user.firebaseUser, 2018).then((events: any) => { // TODO: Make a season selector
      this.newEvents = events.new_events.map((result: any) => new Event().fromJSON(result));
      this.modifiedEvents = events.modified_events.map((result: any) => new ModifiedEvent().fromJSON(result));
    });

    this.cloud.teamsRetriever(this.user.firebaseUser, 2018).then((teams: any) => { // TODO: Make a season selector
      this.newTeams = teams.new_teams.map((result: any) => new Team().fromJSON(result));
      console.log(teams);
      // this.modifiedEvents = events.modified_events.map((result: any) => new ModifiedEvent().fromJSON(result));
    });

    this.ftc.getAllSeasons().then((seasons: any) => {
      this.allSeasons = seasons.map((result: any) => new Season().fromJSON(result));
    });
  }

  createEvents() {
    const json = this.newEvents.map((event) => event.toJSON());
    this.cloud.createEvent(this.user.firebaseUser, json).then((data) => {
      this.translate.get('pages.account.retriever.success', {value: this.newEvents.length}).subscribe((str) => {
        this.snackbar.open(str).afterDismiss();
      });
      this.newEvents = undefined;
      return this.cloud.eventsRetriever(this.user.firebaseUser, 2018);
    }).then((events: any) => {
      this.newEvents = events.new_events.map((result: any) => new Event().fromJSON(result));
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
    });
  }

  removeNewEventFromList(event: Event) {
    for (const e in this.newEvents) {
      if (this.newEvents[e] === event) {
        this.newEvents.splice(parseInt(e, 10), 1);
        break;
      }
    }
  }

  removeNewTeamFromList(team: Team) {
    for (const t in this.newTeams) {
      if (this.newTeams[t] === team) {
        this.newTeams.splice(parseInt(t, 10), 1);
        break;
      }
    }
  }

  removeModifiedEventFrom(event: ModifiedEvent) {
    for (const e in this.modifiedEvents) {
      if (this.modifiedEvents[e] === event) {
        this.modifiedEvents.splice(parseInt(e, 10), 1);
        break;
      }
    }
  }
}
