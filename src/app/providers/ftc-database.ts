import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import WebAnnouncement from '../models/WebAnnouncement';
import Season from '../models/Season';
import Region from '../models/Region';
import League from '../models/League';
import Team from '../models/Team';
import Event from '../models/Event';
import EventType from '../models/EventType';
import MatchParticipant from '../models/MatchParticipant';
import Match from '../models/Match';
import EventLiveStream from '../models/EventLiveStream';
import Ranking from '../models/Ranking';
import AwardRecipient from '../models/AwardRecipient';
import EventParticipant from '../models/EventParticipant';
import * as GameData from '../models/game-specifics/GameData';

@Injectable()
export class FTCDatabase {

  public year = '1819';

  constructor(private http: HttpClient) {}

  private request(url: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const authHeader = new HttpHeaders({
        'X-Application-Origin': 'TOA-WebApp-1819',
        'Content-Type': 'application/json'
      });
      this.http.get('https://theorangealliance.org/api' + url, { headers: authHeader }).subscribe((data: any[]) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public getAnnouncements(): Promise<WebAnnouncement[]> {
    return new Promise<WebAnnouncement[]>((resolve, reject) => {
      this.request('/web/announcements').then((data: any[]) => {
        resolve(data.map((result: any) => new WebAnnouncement().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllSeasons(): Promise<Season[]> {
    return new Promise<Season[]>((resolve, reject) => {
      this.request('/seasons').then((data: any[]) => {
        resolve(data.map((result: any) => new Season().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllRegions(): Promise<Region[]> {
    return new Promise<Region[]>((resolve, reject) => {
      this.request('/regions').then((data: any[]) => {
        resolve(data.map((result: any) => new Region().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllLeagues(): Promise<League[]> {
    return new Promise<League[]>((resolve, reject) => {
      this.request('/leagues').then((data: any[]) => {
        resolve(data.map((result: any) => new League().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllTeams(): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      this.request('/team').then((data: any[]) => {
        resolve(data.map((result: any) => new Team().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamSize(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.request('/team/size').then((data: any) => {
        resolve(parseInt(data.result, 10));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeams(startingRow: number): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      this.request('/team?start=' + startingRow).then((data: any) => {
        resolve(data.map((result: any) => new Team().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getMatchSize(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.request('/match/size').then((data: any) => {
        resolve(parseInt(data.result, 10));
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreQual(): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=quals').then((data: any) => {
        resolve(data.map((result: any) => new Match().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreElim(): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=elims').then((data: any) => {
        resolve(data.map((result: any) => new Match().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreWithPenalty(): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=all').then((data: any) => {
        resolve(data.map((result: any) => new Match().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getAllEvents(): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.request('/event').then((data: any[]) => {
        resolve(data.map((result: any) => new Event().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventTypes(): Promise<EventType[]> {
    return new Promise<EventType[]>((resolve, reject) => {
      this.request('/event-types').then((data: any[]) => {
        resolve(data.map((result: any) => new EventType().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getSeasonEvents(season: string): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.request('/event?season_key=' + season).then((data: any[]) => {
        resolve(data.map((result: any) => new Event().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventBasic(eventKey: string): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.request('/event/' + eventKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Event().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getEvent(eventKey: string): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      const promises: Promise<any>[] = [];
      promises.push(this.request('/event/' + eventKey));
      promises.push(this.request('/event/' + eventKey + '/matches'));
      promises.push(this.request('/event/' + eventKey + '/rankings'));
      promises.push(this.request('/event/' + eventKey + '/awards'));
      promises.push(this.request('/event/' + eventKey + '/teams'));
      Promise.all(promises).then((data: any[]) => {
        if (data[0]) {
          const event: Event = new Event().fromJSON(data[0][0]);
          event.matches = data[1].map((matchJSON: any) => new Match().fromJSON(matchJSON));
          event.rankings = data[2].map((rankJSON: any) => new Ranking().fromJSON(rankJSON));
          event.awards = data[3].map((awardJSON: any) => new AwardRecipient().fromJSON(awardJSON));
          event.teams = data[4].map((teamJSON: any) => new EventParticipant().fromJSON(teamJSON));
          resolve(event);
        } else {
          resolve(null);
        }
      }).catch((error: any) => reject(error));
    });
  }

  public getTeam(teamNumber: number, seasonKey: string): Promise<Team> {
    return new Promise<Team>((resolve, reject) => {
      const promises: Promise<any>[] = [];
      promises.push(this.request('/team/' + teamNumber));
      promises.push(this.request('/team/' + teamNumber + '/results/' + seasonKey));
      promises.push(this.request('/team/' + teamNumber + '/awards/' + seasonKey));
      Promise.all(promises).then((data: any[]) => {
        if (data[0][0]) {
          const team: Team = new Team().fromJSON(data[0][0]);
          team.rankings = data[1].map((rankJSON: any) => new Ranking().fromJSON(rankJSON));
          team.awards = data[2].map((awardJSON: any) => new AwardRecipient().fromJSON(awardJSON));
          resolve(team);
        } else {
          resolve(null);
        }
      }).catch((error: any) => reject(error));
    });
  }

  public getMatchParticipants(matchKey: string): Promise<MatchParticipant[]> {
    return new Promise<MatchParticipant[]>((resolve, reject) => {
      this.request('/match/' + matchKey + '/participants').then((data: any[]) => {
        resolve(data.map((result: any) => new MatchParticipant().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamEvents(teamNumber: number, seasonKey: string): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.request('/team/' + teamNumber + '/events/' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Event().fromJSON(result.event)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventMatches(eventKey: string): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      this.request('/event/' + eventKey + '/matches').then((data: any[]) => {
        resolve(data.map((result: any) => new Match().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getMatchDetails(matchKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      const promises: Promise<any>[] = [];
      promises.push(this.request('/match/' + matchKey));
      promises.push(this.request('/match/' + matchKey + '/details'));
      promises.push(this.request('/match/' + matchKey + '/participants'));
      Promise.all(promises).then((data: any[]) => {
        if (data[0][0]) {
          const match: Match = new Match().fromJSON(data[0][0]);
          match.details = GameData.getMatchDetails(matchKey.split('-')[0]).fromJSON(data[1][0] || {});
          match.participants = data[2].map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON));
          resolve(match);
        } else {
          resolve(null);
        }
      }).catch((error: any) => reject(error));
    });
  }

  public getAllStreams(): Promise<EventLiveStream[]> {
    return new Promise<EventLiveStream[]>((resolve, reject) => {
      this.request('/streams').then((data: any[]) => {
        resolve(data.map((result: any) => new EventLiveStream().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventStreams(eventKey: string): Promise<EventLiveStream[]> {
    return new Promise<EventLiveStream[]>((resolve, reject) => {
      this.request('/event/' + eventKey).then((data: any[]) => {
        resolve(data.map((result: any) => new EventLiveStream().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }
}
