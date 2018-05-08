import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/observable/forkJoin'
import {forkJoin} from "rxjs/observable/forkJoin";

@Injectable()
export class FTCDatabase {

  year = 1718;

  constructor(private http: HttpClient) {}

  private request(url: string) {
    const auth_header = new HttpHeaders({
      'X-Application-Origin': 'TOA'
    });
    return this.http.get('https://theorangealliance.org/apiv2' + url, { headers: auth_header });
    // return this.http.get('http://localhost:8009/apiv2' + url, { headers: auth_header });
  }

  public getAnnouncements() {
    return this.request('/web/announcements');
  }

  public getWebChangelog() {
    return this.request('/web/changelog');
  }

  public getAPIDoc() {
    return this.request('/web/doc');
  }

  public getAllSeasons() {
    return this.request('/seasons');
  }

  public getAllRegions() {
    return this.request('/regions');
  }

  public getAllLeagues() {
    return this.request('/leagues');
  }

  public getEveryTeam() {
    return this.request('/teams');
  }

  public getAllTeams() {
    return this.request('/teams/count');
  }

  public getTeams(starting_row: number) {
    return this.request('/teams/' + starting_row);
  }

  public getAllMatches(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/count');
  }

  public getInsights(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/insights');
  }

  public getHighScoreQual(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/qual-no-penalty');
  }

  public getHighScoreElim(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/elim-no-penalty');
  }

  public getHighScoreWithPenalty(year?: number) {
    return this.request('/matches/' + (year == null ? this.year : year) + '/high-scores/with-penalty');
  }

  public getAllEvents() {
    return this.request('/events/');
  }

  public getSeasonEvents(season: any) {
    return this.request('/events/season/' + season);
  }

  public getEvent(event_key, year?: number) {
    return forkJoin(
      this.request('/event/' + event_key),
      this.request('/event/' + event_key + '/matches'),
      this.request('/event/' + event_key + '/matches/stations'),
      this.request('/event/' + event_key + '/alliances'),
      this.request('/event/' + event_key + '/rankings'),
      this.request('/event/' + event_key + '/awards'),
      this.request('/event/' + event_key + '/teams')
    );
  }

  public getTeam(team_number: number, year?: number) {
    return forkJoin(
      this.request('/team/' + team_number),
      this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/events'),
      this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/results'),
      this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/awards')
    );
  }

  public getStations(match_key: string, year?: number) {
    return this.request('/match/' + match_key + '/stations');
  }

  public getTeamEvents(team_number: number, year?: number) {
    return this.request('/team/' + team_number + '/' + (year == null ? this.year : year) + '/events');
  }

  public getEventName(event_key) {
    return this.request('/event/' +  event_key);
  }

  public getEventMatches(event_key: string, year?: number) {
    return this.request('/event/' + event_key + '/matches/stations');
  }

  public getMatchDetail(match_key: string, year?: number) {
    return forkJoin(
      this.request('/match/' + match_key),
      this.request('/match/' + match_key + '/details'),
      this.request('/match/' + match_key + '/stations')
    );
  }

  public getAllStreams() {
    return this.request('/events/streams');
  }

  public getEventStream(event_key: string) {
    return this.request('/event/' + event_key + "/stream");
  }

}
