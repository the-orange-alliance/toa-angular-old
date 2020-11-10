import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import Event from '../../models/Event';
import Match from '../../models/Match';
import MatchParticipant from '../../models/MatchParticipant';
import EventLiveStream from '../../models/EventLiveStream';
import Team from '../../models/Team';

@Component({
  selector: 'toa-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class HomeComponent {

  search = '';
  teamSearchResults: Team[] = [];
  eventSearchResults: Event[] = [];

  public currentEvents: Event[];

  public highScoreQual: Match;
  public highScoreElim: Match;
  public highScoreAll: Match;
  public highScoreSingleTeam: Match;
  public highScoreSingleTeamPenalty: Match;

  public matchCount: number;
  public teamsCount: number;

  public firstupdatesnow: EventLiveStream;
  public today: Date;

  constructor(private router: Router, private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals) {
    this.today = new Date();
    this.currentEvents = [];
    this.app.setTitle('Home');
    this.app.setDescription('The Orange Alliance is the official match, event, and team data provider for FIRST Tech Challenge.');
    this.ftc.getTeamSize(this.ftc.year).then((data: number) => {
      this.teamsCount = data;
    });
    this.ftc.getMatchSize().then((data: number) => {
      this.matchCount = data;
    });
    this.ftc.getHighScoreQual(this.ftc.year).then((data: Match) => {
      this.highScoreQual = data;
      if (data) {
        this.ftc.getMatchParticipants(this.highScoreQual.matchKey).then((participants: MatchParticipant[]) => {
          this.highScoreQual.participants = participants;
        });
        this.ftc.getEventBasic(this.highScoreQual.eventKey).then((event: Event) => {
          this.highScoreQual.event = event;
        });
      }
    });
    this.ftc.getHighScoreElim(this.ftc.year).then((data: Match) => {
      this.highScoreElim = data;
      if (data) {
        this.ftc.getMatchParticipants(this.highScoreElim.matchKey).then((participants: MatchParticipant[]) => {
          this.highScoreElim.participants = participants;
        });
        this.ftc.getEventBasic(this.highScoreElim.eventKey).then((event: Event) => {
          this.highScoreElim.event = event;
        });
      }
    });
    this.ftc.getHighScoreWithPenalty(this.ftc.year).then((data: Match) => {
      this.highScoreAll = data;
      if (data) {
        this.ftc.getMatchParticipants(this.highScoreAll.matchKey).then((participants: MatchParticipant[]) => {
          this.highScoreAll.participants = participants;
        });
        this.ftc.getEventBasic(this.highScoreAll.eventKey).then((event: Event) => {
          this.highScoreAll.event = event;
        });
      }
    });
    this.ftc.getHighScoreSingleTeam(this.ftc.year).then((data: Match) => {
      this.highScoreSingleTeam = data;
      if (data) {
        this.ftc.getMatchParticipants(this.highScoreSingleTeam.matchKey).then((participants: MatchParticipant[]) => {
          this.highScoreSingleTeam.participants = participants;
        });
        this.ftc.getEventBasic(this.highScoreSingleTeam.eventKey).then((event: Event) => {
          this.highScoreSingleTeam.event = event;
        });
      }
    });
    this.ftc.getHighScoreSingleTeamWithPenalty(this.ftc.year).then((data: Match) => {
      this.highScoreSingleTeamPenalty = data;
      if (data) {
        this.ftc.getMatchParticipants(this.highScoreSingleTeamPenalty.matchKey).then((participants: MatchParticipant[]) => {
          this.highScoreSingleTeamPenalty.participants = participants;
        });
        this.ftc.getEventBasic(this.highScoreSingleTeamPenalty.eventKey).then((event: Event) => {
          this.highScoreSingleTeamPenalty.event = event;
        });
      }
    });
    this.ftc.getSeasonEvents(this.ftc.year).then((events: Event[]) => {
      const today = new Date();
      this.currentEvents = [];
      for (const event of events) {
        if (this.isBetweenDates(new Date(event.startDate), new Date(event.endDate), today)) {
          this.currentEvents.push(event);
        }
      }
      this.currentEvents.sort((a: Event, b: Event) => b.teamCount - a.teamCount);
    });

    this.ftc.getAllStreams().then((streams: EventLiveStream[]) => {
      for (const stream of streams) {
        if (stream.streamKey === 'firstupdatesnow') {
          this.firstupdatesnow = stream;
        }
      }
    })
  }

  private isBetweenDates(startDate: Date, endDate: Date, today: Date) {
    const startValue: number = this.removeFractionalDay(startDate).valueOf();
    const endValue: number   = this.removeFractionalDay(endDate).valueOf();
    const todayValue: number = this.removeFractionalDay(today).valueOf();

    return (todayValue <= endValue && todayValue >= startValue);
  }

  private removeFractionalDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  public openTeamPage(team: any) {
    this.router.navigate(['/teams', team]);
  }

  public openEvent(eventKey: string, e: any): void {
    this.router.navigate(['/events', eventKey]);
  }

  public openMatchDetails(matchKey: string) {
    this.router.navigate(['/matches', matchKey]);
  }

  public willFUNstartSoon(): boolean {
    const diff = (new Date(this.firstupdatesnow.startDateTime).valueOf() - this.today.valueOf()) / 1000 / 60 / 60; // Convert milliseconds to hours
    return diff <= 24 && diff >= 0;
  }

  public isFUNonLive(): boolean {
    const startDateTime = new Date(this.firstupdatesnow.startDateTime).valueOf();
    const endDateTime = new Date(this.firstupdatesnow.endDateTime).valueOf();
    const todayTime = new Date().valueOf();

    return (todayTime <= endDateTime && todayTime >= startDateTime);
  }

  getBoldText(text: string): string {
    let pattern = this.search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    pattern = pattern.split(' ').filter((t) => {
      return t.length > 0;
    }).join('|');
    const regex = new RegExp(pattern, 'gi');

    return '<p>' + (this.search ? text.replace(regex, (match) => `<b>${match}</b>`) : text) + '</p>';
  }

  teamClicked(e, teamKey): void {
    this.router.navigate(['/teams', teamKey]);
  }

  eventClicked(e, eventKey): void {
    this.router.navigate(['/events', eventKey]);
  }
}
