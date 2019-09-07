import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MdcSnackbar, MdcTabBar} from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { FTCDatabase } from '../../../../providers/ftc-database';
import User from '../../../../models/User';
import Event from '../../../../models/Event';
import ModifiedEvent from '../../../../models/ModifiedEvent';
import Team from '../../../../models/Team';
import Season from '../../../../models/Season';
import ModifiedTeam from '../../../../models/ModifiedTeam';

@Component({
  selector: 'toa-account-retriever',
  templateUrl: './retriever.component.html',
  styleUrls: ['../../account.component.scss']
})
export class RetrieverComponent implements OnInit {

  @Input() user: User;

  newEvents: Event[] = null;
  modifiedEvents: ModifiedEvent[] = null;

  newTeams: Team[] = null;
  modifiedTeams: ModifiedTeam[] = null;
  viewNewTeams = false;
  viewModTeams = false;

  allSeasons: Season[] = null;
  selectedSeason: Season = null;
  rerunSelectedSeason: Season = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions,
              private translate: TranslateService, private snackbar: MdcSnackbar, private ftc: FTCDatabase) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Retriever');
    this.cloud.eventsRetriever(this.user.firebaseUser, 2018).then((events: any) => {
      this.newEvents = events.new_events.map((result: any) => new Event().fromJSON(result));
      this.modifiedEvents = events.modified_events.map((result: any) => new ModifiedEvent().fromJSON(result));
    });

    this.cloud.teamsRetriever(this.user.firebaseUser, '2018').then((teams: any) => {
      this.newTeams = teams.new_teams.map((result: any) => new Team().fromJSON(result));
      this.modifiedTeams = teams.modified_teams.map((result: any) => new ModifiedTeam().fromJSON(result));
    });

    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.allSeasons = data.reverse();
      this.selectedSeason = this.allSeasons[0];
      this.rerunSelectedSeason = this.allSeasons[0];
    });
  }

  createEvents() {
    const json = this.newEvents.map((event) => event.toJSON());
    this.cloud.createEvent(this.user.firebaseUser, json).then((data) => {
      this.translate.get('pages.account.retriever.success_events', {value: this.newEvents.length}).subscribe((str) => {
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

  createTeams() {
    const json = this.newTeams.map((team) => team.toJSON());
    const route = (this.ftc.year === this.selectedSeason.seasonKey) ? `/team` : `/team/history/${this.selectedSeason.seasonKey}`;
    this.cloud.toaPost(this.user.firebaseUser, json, route).then((data) => {
      this.translate.get('pages.account.retriever.success_teams', {value: this.newTeams.length}).subscribe((str) => {
        this.snackbar.open(str).afterDismiss();
      });
      this.newTeams = undefined;
      return this.cloud.teamsRetriever(this.user.firebaseUser, '20' + this.rerunSelectedSeason.seasonKey.substring(0, 2));
    }).then((teams: any) => {
      this.newTeams = teams.new_teams.map((result: any) => new Team().fromJSON(result));
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

  removeModifiedTeamFrom(team: ModifiedTeam) {
    for (const t in this.modifiedTeams) {
      if (this.modifiedTeams[t] === team) {
        this.modifiedTeams.splice(parseInt(t, 10), 1);
        break;
      }
    }
  }

  onSeasonChange(season: Season) {
    this.selectedSeason = season;
  }

  onReRunSeasonChange(season: Season) {
    this.rerunSelectedSeason = season;
  }

  updateTeams() {
    const json = this.modifiedTeams.map((team) => team.toJSON());
    const route = (this.ftc.year === this.selectedSeason.seasonKey) ? `/team` : `/team/history/${this.selectedSeason.seasonKey}`;
    this.cloud.toaPut(this.user.firebaseUser, json, route).then((data) => {
      this.translate.get('pages.account.retriever.success_teams', {value: this.newTeams.length}).subscribe((str) => {
        this.snackbar.open(str).afterDismiss();
      });
      this.newTeams = undefined;
      return this.cloud.teamsRetriever(this.user.firebaseUser, '20' + this.rerunSelectedSeason.seasonKey.substring(0, 2));
    }).then((teams: any) => {
      this.modifiedTeams = teams.modified_teams.map((result: any) => new ModifiedTeam().fromJSON(result));
    }).catch((err) => {
      this.translate.get('general.error_occurred').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
    });
  }

  rerunRetriever() {
    this.newTeams = undefined;
    this.modifiedTeams = null;

    this.cloud.teamsRetriever(this.user.firebaseUser, '20' + this.rerunSelectedSeason.seasonKey.substring(0, 2)).then((teams: any) => { // TODO: Make a season selector
      this.newTeams = teams.new_teams.map((result: any) => new Team().fromJSON(result));
      this.modifiedEvents = teams.modified_teams.map((result: any) => new ModifiedTeam().fromJSON(result));
    });
  }
}
