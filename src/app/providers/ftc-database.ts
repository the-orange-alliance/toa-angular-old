import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin } from 'rxjs';
import WebAnnouncement from '../models/WebAnnouncement';
import { resolve } from 'url';
import { reject } from 'q';
import Season from '../models/Season';
import Region from '../models/Region';
import League from '../models/League';
import Team from '../models/Team';
import Event from '../models/Event';
import EventType from '../models/EventType';
import MatchParticipant from '../models/MatchParticipant';
import Match from '../models/Match';
import EventLiveStream from '../models/EventLiveStream';

@Injectable()
export class FTCDatabase {

  private year: number = 1718;

  constructor(private http: HttpClient) {}

  private request(url: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const authHeader = new HttpHeaders({
        'X-Application-Origin': 'TOA',
        'X-TOA-Key': 'lYjKJfe4dpfGm9SRPgsEotVC9morohaABU9hQAkXL8k='
      });
      this.http.get('http://theorangealliance.org:8008/api' + url, { headers: authHeader }).subscribe((data: any[]) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public getAnnouncements(): Promise<WebAnnouncement[]> {
    return new Promise<WebAnnouncement[]>((resolve, reject) => {
      this.request("/web/announcements").then((data: any[]) => {
        resolve(data.map((result: any) => new WebAnnouncement().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllSeasons(): Promise<Season[]> {
    return new Promise<Season[]>((resolve, reject) => {
      this.request("/seasons").then((data: any[]) => {
        resolve(data.map((result: any) => new Season().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllRegions(): Promise<Region[]> {
    return new Promise<Region[]>((resolve, reject) => {
      this.request("/regions").then((data: any[]) => {
        resolve(data.map((result: any) => new Region().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllLeagues(): Promise<League[]> {
    return new Promise<League[]>((resolve, reject) => {
      this.request("/leagues").then((data: any[]) => {
        resolve(data.map((result: any) => new League().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllTeams(): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      this.request("/team").then((data: any[]) => {
        resolve(data.map((result: any) => new Team().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamSize(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.request("/team/size").then((data: any) => {
        resolve(parseInt(data));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeams(startingRow: number): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      this.request("/team?start=" + startingRow).then((data: any) => {
        resolve(data.map((result: any) => new Team().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getMatchSize(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.request("/match/size").then((data: any) => {
        resolve(parseInt(data));
      }).catch((err: any) => reject(err));
    });
  }

  /* TODO - Implement in API */
  public getHighScoreQual(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/qual-no-penalty');
  }

  /* TODO - Implement in API */
  public getHighScoreElim(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/elim-no-penalty');
  }

  /* TODO - Implement in API */
  public getHighScoreWithPenalty(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/with-penalty');
  }

  public getAllEvents(): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.request("/event").then((data: any[]) => {
        resolve(data.map((result: any) => new Event().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventTypes(): Promise<EventType[]> {
    return new Promise<EventType[]>((resolve, reject) => {
      this.request("/event-types").then((data: any[]) => {
        resolve(data.map((result: any) => new EventType().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getSeasonEvents(season: any): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.request("/event?season_key=" + season).then((data: any[]) => {
        resolve(data.map((result: any) => new Event().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  /* TODO - Implement in Model */
  public getEvent(eventKey, year?: number) {
    return forkJoin(
      this.request('/event/' + eventKey),
      this.request('/event/' + eventKey + '/matches'),
      this.request('/event/' + eventKey + '/matches/stations'),
      this.request('/event/' + eventKey + '/alliances'),
      this.request('/event/' + eventKey + '/rankings'),
      this.request('/event/' + eventKey + '/awards'),
      this.request('/event/' + eventKey + '/teams')
    );
  }

  /* TODO - Implement in Model */
  public getTeam(teamNumber: number, year?: number) {
    return forkJoin(
      this.request('/team/' + teamNumber),
      this.request('/team/' + teamNumber + '/' + (year == null ? this.year : year) + '/events'),
      this.request('/team/' + teamNumber + '/' + (year == null ? this.year : year) + '/results'),
      this.request('/team/' + teamNumber + '/' + (year == null ? this.year : year) + '/awards')
    );
  }

  public getMatchParticipants(matchKey: string): Promise<MatchParticipant[]> {
    return new Promise<MatchParticipant[]>((resolve, reject) => {
      this.request("/match/" + matchKey + "/participants").then((data: any[]) => {
        resolve(data.map((result: any) => new MatchParticipant().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamEvents(teamNumber: number, seasonKey: string): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.request("/team/" + teamNumber + "/events/" + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Event().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventMatches(eventKey: string): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      this.request("/event/" + eventKey + "/matches").then((data: any[]) => {
        resolve(data.map((result: any) => new Match().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  /* TODO - Implement in Model */
  public getMatchDetails(matchKey: string) {
    return forkJoin(
      this.request('/match/' + matchKey),
      this.request('/match/' + matchKey + '/details'),
      this.request('/match/' + matchKey + '/stations')
    );
  }

  public getAllStreams(): Promise<EventLiveStream[]> {
    return new Promise<EventLiveStream[]>((resolve, reject) => {
      this.request("/streams").then((data: any[]) => {
        resolve(data.map((result: any) => new EventLiveStream().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventStreams(eventKey: string): Promise<EventLiveStream[]> {
    return new Promise<EventLiveStream[]>((resolve, reject) => {
      this.request("/event/" + eventKey).then((data: any[]) => {
        resolve(data.map((result: any) => new EventLiveStream().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

}
