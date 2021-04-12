import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import Media from '../models/Media';
import TeamSeasonRecord from '../models/TeamSeasonRecord';
import Alliance from '../models/Alliance';
import Insights from '../models/Insights';
import * as InsightsData from '../models/game-specifics/InsightsData';
import LeagueDiv from '../models/LeagueDiv';

@Injectable()
export class FTCDatabase {

  public year = '2021';
  public allYears = ['1617', '1718', '1819', '1920', '2021'];

  public baseURL = 'https://theorangealliance.org/api';
  // public baseURL = 'http://127.0.0.1:8080/api';

  constructor(private http: HttpClient) {}

  private request(url: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const authHeader = new HttpHeaders({
        'X-Application-Origin': 'TOA-WebApp-1819',
        'Content-Type': 'application/json'
      });
      this.http.get(this.baseURL + url, { headers: authHeader }).subscribe((data: any[]) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public getDocs(): Promise<any> {
    return this.request('/docs');
  }

  public getInsights(seasonKey: any, type: string, singleTeam: string, regionKey: string): Promise<any> {
    return new Promise<WebAnnouncement[]>((resolve, reject) => {
      const regionString = (regionKey === 'All Regions') ? '' : '&region_key=' + regionKey;
      this.request('/insights/' + seasonKey + '?type=' + type + '&single_team=' + singleTeam + regionString).then((data: any[]) => {
        resolve(data);
      }).catch((err: any) => reject(err));
    });
  }

  public getApiVersion(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.request('/').then((data: any) => {
        resolve(data.version);
      }).catch((err: any) => reject(err));
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

  public getAllEventTypes(): Promise<EventType[]> {
    return new Promise<EventType[]>((resolve, reject) => {
      this.request('/event-types').then((data: any[]) => {
        resolve(data.map((result: any) => new EventType().fromJSON(result)));
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

  public getAllLeagues(seasonKey = undefined, regionKey = undefined): Promise<League[]> {
    const seasonQuery = 'season_key=' + seasonKey;
    const regionQuery = 'region_key=' + regionKey;
    let queries;
    if (regionKey !== undefined && seasonKey !== undefined) {
      queries = `?${regionQuery}&${seasonQuery}`
    } else {
      queries = (regionKey !== undefined) ? `?${regionQuery}` : (seasonKey !== undefined) ? `?${seasonQuery}` : '';
    }
    return new Promise<League[]>((resolve, reject) => {
      this.request('/leagues' + queries).then((data: any[]) => {
        resolve(data.map((result: any) => new League().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getAllLeagueDivisions(seasonKey = undefined, regionKey = undefined, leagueKey = undefined): Promise<LeagueDiv[]> {
    const seasonQuery = 'season_key=' + seasonKey;
    const regionQuery = 'region_key=' + regionKey;
    const leagueQuery = 'league_key=' + leagueKey;
    let queries = '';
    if (seasonKey !== undefined || regionKey !== undefined || leagueKey !== undefined) {
      queries = `?${(seasonKey !== undefined) ? seasonQuery : ''}`;
      queries += (queries.length > 1 && regionKey !== undefined) ? `&${regionQuery}` : (queries.length === 1 && regionKey !== undefined) ? regionQuery : '';
      queries += (queries.length > 1 && leagueKey !== undefined) ? `&${leagueQuery}` : (queries.length === 1 && leagueKey !== undefined) ? leagueQuery : '';
    }
    return new Promise<LeagueDiv[]>((resolve, reject) => {
      this.request('/league/divisions' + queries).then((data: any[]) => {
        resolve(data.map((result: any) => new LeagueDiv().fromJSON(result)));
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

  public getTeamSize(lastActive): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.request('/team/size?last_active=' + lastActive).then((data: any) => {
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
      this.request('/match/size?played=true&season_key=' + this.year).then((data: any) => {
        resolve(parseInt(data.result, 10));
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreQual(seasonKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=quals&season_key=' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Match().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreElim(seasonKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=elims&season_key=' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Match().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreWithPenalty(seasonKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=all&penalty=true&season_key=' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Match().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreSingleTeam(seasonKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=single_team&season_key=' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Match().fromJSON(result))[0]);
      }).catch((err: any) => reject(err));
    });
  }

  public getHighScoreSingleTeamWithPenalty(seasonKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.request('/match/high-scores?type=single_team&penalty=true&season_key=' + seasonKey).then((data: any[]) => {
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
      this.request('/event?includeTeamCount=true&season_key=' + season).then((data: any[]) => {
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
      promises.push(this.request('/event/' + eventKey).catch(() => null));
      promises.push(this.request('/event/' + eventKey + '/matches').catch(() => []));
      promises.push(this.request('/event/' + eventKey + '/rankings').catch(() => []));
      promises.push(this.request('/event/' + eventKey + '/awards').catch(() => []));
      promises.push(this.request('/event/' + eventKey + '/teams').catch(() => []));
      promises.push(this.request('/event/' + eventKey + '/alliances').catch(() => []));
      Promise.all(promises).then((data: any[]) => {
        if (data[0]) {
          const event: Event = (data[0][0]) ? new Event().fromJSON(data[0][0]) : null;
          event.matches = data[1].map((matchJSON: any) => new Match().fromJSON(matchJSON));
          event.rankings = data[2].map((rankJSON: any) => new Ranking().fromJSON(rankJSON));
          event.awards = data[3].map((awardJSON: any) => new AwardRecipient().fromJSON(awardJSON));
          event.teams = data[4].map((teamJSON: any) => new EventParticipant().fromJSON(teamJSON));
          event.alliances = data[5].map((allianceJSON: any) => new Alliance().fromJSON(allianceJSON));
          resolve(event);
        } else {
          reject(null);
        }
      }).catch((error: any) => reject(error));
    });
  }

  public getTeam(teamKey: string, seasonKey: string): Promise<Team> {
    return new Promise<Team>((resolve, reject) => {
      const promises: Promise<any>[] = [];
      promises.push(this.request('/team/' + teamKey).catch(() => null));
      promises.push(this.request('/team/' + teamKey + '/results/' + seasonKey).catch(() => []));
      promises.push(this.request('/team/' + teamKey + '/awards/' + seasonKey).catch(() => []));
      Promise.all(promises).then((data: any[]) => {
        if (data[0]) {
          const team: Team = (data[0][0]) ? new Team().fromJSON(data[0][0]) : null;
          team.rankings = data[1].map((rankJSON: any) => new Ranking().fromJSON(rankJSON));
          team.awards = data[2].map((awardJSON: any) => new AwardRecipient().fromJSON(awardJSON));
          resolve(team);
        } else {
          reject(null);
        }
      }).catch((error: any) => reject(error));
    });
  }

  public getTeamBasic(teamKey: string): Promise<Team> {
    return new Promise<Team>((resolve, reject) => {
      this.request('/team/' + teamKey).then((data: any[]) => {
        resolve(new Team().fromJSON(data[0]));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamWLT(teamKey: string, seasonKey: string): Promise<TeamSeasonRecord> {
    return new Promise<TeamSeasonRecord>((resolve, reject) => {
      this.request('/team/' + teamKey + '/wlt?season_key=' + seasonKey).then((data: any[]) => {
        resolve(new TeamSeasonRecord().fromJSON(data[0]));
      }).catch((err: any) => reject(err));
    });
  }

  public getMatchParticipants(matchKey: string): Promise<MatchParticipant[]> {
    return new Promise<MatchParticipant[]>((resolve, reject) => {
      this.request('/match/' + matchKey + '/participants').then((data: any[]) => {
        resolve(data.map((result: any) => new MatchParticipant().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamEvents(teamKey: string, seasonKey: string): Promise<EventParticipant[]> {
    return new Promise<EventParticipant[]>((resolve, reject) => {
      this.request('/team/' + teamKey + '/events/' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new EventParticipant().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamResults(teamKey: string, seasonKey: string): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      this.request('/team/' + teamKey + '/results/' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Ranking().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamAwards(teamKey: string, seasonKey: string): Promise<AwardRecipient[]> {
    return new Promise<AwardRecipient[]>((resolve, reject) => {
      this.request('/team/' + teamKey + '/awards/' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new AwardRecipient().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getTeamMedia(teamKey: string, seasonKey: string): Promise<Media[]> {
    return new Promise<Media[]>((resolve, reject) => {
      this.request('/team/' + teamKey + '/media/' + seasonKey).then((data: any[]) => {
        resolve(data.map((result: any) => new Media().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }

  public getEventMedia(eventKey: string): Promise<Media[]> {
    return new Promise<Media[]>((resolve, reject) => {
      this.request('/event/' + eventKey + '/media/').then((data: any[]) => {
        resolve(data.map((result: any) => new Media().fromJSON(result)));
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

  public getEventInsights(eventKey: string, type: string): Promise<Insights> {
    return new Promise<Insights>((resolve, reject) => {
      this.request('/event/' + eventKey + '/insights?type=' + type).then((data: any[]) => {
        if (!data || !data[0]) {
          return null;
        }
        resolve(InsightsData.getInsights(eventKey.split('-')[0]).fromJSON(data[0]));
      }).catch((err: any) => reject(err));
    });
  }

  public getMatchDetails(matchKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      const promises: Promise<any>[] = [];
      promises.push(this.request('/match/' + matchKey).catch(() => null));
      promises.push(this.request('/match/' + matchKey + '/details').catch(() => null));
      promises.push(this.request('/match/' + matchKey + '/participants').catch(() => []));
      Promise.all(promises).then((data: any[]) => {
        if (data[0][0]) {
          const match: Match = new Match().fromJSON(data[0][0]);
          if (data[1] && data[1][0]) {
            match.details = GameData.getMatchDetails(matchKey.split('-')[0]).fromJSON(data[1][0] || {});
          }
          match.participants = data[2].map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON));
          resolve(match);
        } else {
          reject(null);
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
      this.request('/event/' + eventKey + '/streams').then((data: any[]) => {
        resolve(data.map((result: any) => new EventLiveStream().fromJSON(result)));
      }).catch((err: any) => reject(err));
    });
  }
}
