import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class FTCDatabase {

  year = 1718;

  constructor(private http: Http) {}

  private request(url: string) {
    const auth_header = new Headers({
      'X-Application-Origin': 'TOA'
    });
    return this.http.get('https://theorangealliance.org/apiv2' + url, { headers: auth_header });
    // return this.http.get('http://localhost:8009/apiv2' + url, { headers: auth_header });
  }

  public getAnnouncements() {
    return this.request('/web/announcements').map(res => res.json());
  }

  public getWebChangelog() {
    return this.request('/web/changelog').map(res => res.json());
  }

  public getAPIDoc() {
    return this.request('/web/doc').map(res => res.json());
  }

  public getAllSeasons() {
    return this.request('/seasons').map(res => res.json());
  }

  public getAllRegions() {
    return this.request('/regions').map(res => res.json());
  }

  public getAllLeagues() {
    return this.request('/leagues').map(res => res.json());
  }

  public getEveryTeam() {
    return this.request('/teams').map(res => res.json());
  }

  public getAllTeams() {
    return this.request('/teams/count').map(res => res.json());
  }

  public getTeams(starting_row: number) {
    return this.request('/teams/' + starting_row).map(res => res.json());
  }

  public getAllMatches(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/count').map(res => res.json());
  }

  public getInsights(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/insights').map(res => res.json());
  }

  public getHighScoreQual(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/qual-no-penalty').map(res => res.json());
  }

  public getHighScoreElim(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/elim-no-penalty').map(res => res.json());
  }

  public getHighScoreWithPenalty(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/with-penalty').map(res => res.json());
  }

  public getAllEvents() {
    return this.request('/events/').map(res => res.json());
  }

  public getSeasonEvents(season: any) {
    return this.request('/events/season/' + season).map(res => res.json());
  }

  public getEvent(event_key, year?: number) {
    return Observable.forkJoin(
      this.request('/event/' + event_key).map(res => res.json()),
      this.request('/event/' + event_key + '/matches').map(res => res.json()),
      this.request('/event/' + event_key + '/matches/stations').map(res => res.json()),
      this.request('/event/' + event_key + '/alliances').map(res => res.json()),
      this.request('/event/' + event_key + '/rankings').map(res => res.json()),
      this.request('/event/' + event_key + '/awards').map(res => res.json()),
      this.request('/event/' + event_key + '/teams').map(res => res.json())
    );
  }

  public getTeam(team_number: number, year?: number) {
    return Observable.forkJoin(
      this.request('/team/' + team_number).map(res => res.json()),
      this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/events').map(res => res.json()),
      this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/results').map(res => res.json()),
      this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/awards').map(res => res.json())
    );
  }

  public getStations(match_key: string, year?: number) {
    return this.request('/match/' + match_key + '/stations').map(res => res.json());
  }

  public getTeamEvents(team_number: number, year?: number) {
    return this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/events').map(res => res.json());
  }

  public getEventName(event_key) {
    return this.request('/event/' +  event_key).map(res => res.json());
  }

  public getEventMatches(event_key: string, year?: number) {
    return this.request('/event/' + event_key + '/matches/stations').map(res => res.json());
  }

  public getMatchDetail(match_key: string, year?: number) {
    return Observable.forkJoin(
      this.request('/match/' + match_key).map(res => res.json()),
      this.request('/match/' + match_key + '/details').map(res => res.json()),
      this.request('/match/' + match_key + '/stations').map(res => res.json())
    );
  }

  public getAllStreams() {
    return this.request('/events/streams').map(res => res.json());
  }

  public getEventStream(event_key: string) {
    return this.request('/event/' + event_key + "/stream").map(res => res.json());
  }

}
