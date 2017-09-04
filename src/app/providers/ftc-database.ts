import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class FTCDatabase {

  year = 2017;

  constructor(private http: Http) {}

  private request(url: string) {
    const auth_header = new Headers({
      'X-Application-Origin': 'TOA'
    });
    return this.http.get('https://www.theorangealliance.org' + url, { headers: auth_header });
  }

  public getAnnouncements() {
    return this.request('/api/web/announcements').map(res => res.json());
  }

  public getWebChangelog() {
    return this.request('/api/web/changelog').map(res => res.json());
  }

  public getAPIDoc() {
    return this.request('/api/web/doc').map(res => res.json());
  }

  public getAllSeasons() {
    return this.request('/api/seasons').map(res => res.json());
  }

  public getAllRegions() {
    return this.request('/api/regions').map(res => res.json());
  }

  public getAllLeagues() {
    return this.request('/api/leagues').map(res => res.json());
  }

  public getEveryTeam() {
    return this.request('/api/teams').map(res => res.json());
  }

  public getAllTeams() {
    return this.request('/api/teams/count').map(res => res.json());
  }

  public getTeams(starting_row: number) {
    return this.request('/api/teams/' + starting_row).map(res => res.json());
  }

  public getAllMatches(year?: number) {
    return this.request('/api/matches/' + (year == null ? this.year : year) + '/count').map(res => res.json());
  }

  public getHighScoreQual(year?: number) {
    return this.request('/api/matches/' + (year == null ? this.year : year) + '/high-scores/qual-no-penalty').map(res => res.json());
  }

  public getHighScoreElim(year?: number) {
    return this.request('/api/matches/' + (year == null ? this.year : year) + '/high-scores/elim-no-penalty').map(res => res.json());
  }

  public getHighScoreWithPenalty(year?: number) {
    return this.request('/api/matches/' + (year == null ? this.year : year) + '/high-scores/with-penalty').map(res => res.json());
  }

  public getAllEvents() {
    return this.request('/api/events/').map(res => res.json());
  }

  public getSeasonEvents(season: any) {
    return this.request('/api/events/season/' + season).map(res => res.json());
  }

  public getEvent(event_key, year?: number) {
    return Observable.forkJoin(
      this.request('/api/event/' + event_key).map(res => res.json()),
      this.request('/api/event/' + (year == null ? this.year : year) + '/' + event_key + '/matches').map(res => res.json()),
      this.request('/api/event/' + (year == null ? this.year : year) + '/' + event_key + '/matches/stations').map(res => res.json()),
      this.request('/api/event/' + (year == null ? this.year : year) + '/' + event_key + '/alliances').map(res => res.json()),
      this.request('/api/event/' + (year == null ? this.year : year) + '/' + event_key + '/rankings').map(res => res.json()),
      this.request('/api/event/' + (year == null ? this.year : year) + '/' + event_key + '/awards').map(res => res.json()),
      this.request('/api/event/' + (year == null ? this.year : year) + '/' + event_key + '/teams').map(res => res.json())
    );
  }

  public getTeam(team_number: number, year?: number) {
    return Observable.forkJoin(
      this.request('/api/team/' + team_number).map(res => res.json()),
      this.request('/api/team/' + team_number + '/' + (year == null ? this.year : year) + '/events').map(res => res.json()),
      this.request('/api/team/' + team_number + '/' + (year == null ? this.year : year) + '/results').map(res => res.json()),
      this.request('/api/team/' + team_number + '/' + (year == null ? this.year : year) + '/awards').map(res => res.json())
    );
  }

  public getStations(match_key: string, year?: number) {
    return this.request('/api/match/' + (year == null ? this.year : year) + '/' + match_key + '/stations').map(res => res.json());
  }

  public getTeamEvents(team_number: number, year?: number) {
    return this.request('/api/team/' + team_number + '/' + (year == null ? this.year : year) + '/events').map(res => res.json());
  }

  public getEventName(event_key) {
    return this.request('/api/event/' +  event_key).map(res => res.json());
  }

  public getEventMatches(event_key: string, year?: number) {
    return this.request('/api/event/' + (year == null ? this.year : year) + '/' + event_key + '/matches/stations').map(res => res.json());
  }

  public getMatchDetail(match_key: string, year?: number) {
    return Observable.forkJoin(
      this.request('/api/match/' + (year == null ? this.year : year) + '/' + match_key).map(res => res.json()),
      this.request('/api/match/' + (year == null ? this.year : year) + '/' + match_key + '/details').map(res => res.json()),
      this.request('/api/match/' + (year == null ? this.year : year) + '/' + match_key + '/stations').map(res => res.json())
    );
  }

}
