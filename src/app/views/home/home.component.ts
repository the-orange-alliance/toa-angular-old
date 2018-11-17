import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import WebAnnouncement from '../../models/WebAnnouncement';
import Event from '../../models/Event';
import Match from '../../models/Match';
import MatchParticipant from '../../models/MatchParticipant';
import EventLiveStream from "../../models/EventLiveStream";

@Component({
  selector: 'toa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class HomeComponent {

  public currentAnnouncement: WebAnnouncement;
  public currentEvents: Event[];

  public highScoreQual: Match;
  public highScoreElim: Match;
  public highScoreAll: Match;

  public matchCount: number;
  public teamsCount: number;

  public firstupdatesnow: EventLiveStream;

  public today: Date;
  public weekStart: Date;
  public weekEnd: Date;

  constructor(private router: Router, private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals) {
    this.today = new Date();
    this.currentEvents = [];
    this.app.setTitle('Home');
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
    this.ftc.getSeasonEvents(this.ftc.year).then((events: Event[]) => {
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate() ); /** remove fractional day */
      this.currentEvents = [];
      for (const event of events) {
        this.weekStart = this.getStartOfWeek(new Date(event.startDate));
        this.weekEnd = this.getEndofWeek(new Date(event.endDate));
        if (this.isBetweenDates(this.weekStart, this.weekEnd, today)) {
          this.currentEvents.push(event);
        }
      }
    });

    this.ftc.getAnnouncements().then((announcements: WebAnnouncement[]) => {
      const today = new Date();
      for (const announcement of announcements) {
        if (announcement.isActive) {
          this.currentAnnouncement = announcement;
          break;
        }
      }
    });

    this.ftc.getAllStreams().then((streams: EventLiveStream[]) => {
      for (const stream of streams) {
        if (stream.streamKey === 'firstupdatesnow') {
          this.firstupdatesnow = stream;
        }
      }
    })
  }

  private getStartOfWeek(d: Date): Date {
    const day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0 ? -6 : 1) - day);
  }

  private getEndofWeek(d: Date): Date {
    const day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0 ? 0 : 7) - day);
  }

  private isBetweenDates(startDate: Date, endDate: Date, today: Date) {
    return (today <= endDate && today >= startDate);
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
    const diff = (new Date(this.firstupdatesnow.startDateTime).valueOf() - this.today.valueOf()) / 1000 / 60 / 60;// Convert milliseconds to hours
    return diff <= 24 && diff >= 0;
  }

  public isFUNonLive(): boolean {
    const startDateTime = new Date(this.firstupdatesnow.startDateTime);
    const endDateTime = new Date(this.firstupdatesnow.endDateTime);
    return this.isBetweenDates(startDateTime, endDateTime, this.today)
  }
}
