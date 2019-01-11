import Ranking from './Ranking';
import AwardRecipient from './AwardRecipient';
import Event from './Event';
import Media from './Media';

export default class Team implements ISerializable {
  private _teamKey: number;
  private _regionKey: string;
  private _leagueKey: string;
  private _teamNameShort: string;
  private _teamNameLong: string;
  private _robotName: string;
  private _lastActive: string;
  private _city: string;
  private _stateProv: string;
  private _zipCode: number;
  private _country: string;
  private _rookieYear: number;
  private _website: string;

  private _events: Event[];
  private _rankings: Ranking[];
  private _awards: AwardRecipient[];
  private _media: Media[];

  constructor() {
    this._teamKey = 0;
    this._regionKey = '';
    this._leagueKey = '';
    this._teamNameShort = '';
    this._teamNameLong = '';
    this._robotName = '';
    this._lastActive = '';
    this._city = '';
    this._stateProv = '';
    this._zipCode = 0;
    this._country = '';
    this._rookieYear = 0;
    this._website = '';

    this._events = [];
    this._rankings = [];
    this._awards = [];
    this._media = [];
  }

  toJSON(): object {
    return {
      team_key: this.teamKey,
      region_key: this.regionKey,
      league_key: this.leagueKey,
      team_name_short: this.teamNameShort,
      team_name_long: this.teamNameLong,
      robot_name: this.robotName,
      last_active: this.lastActive,
      city: this.city,
      state_prov: this.stateProv,
      zip_code: this.zipCode,
      country: this.country,
      rookie_year: this.rookieYear,
      website: this.website
    };
  }

  fromJSON(json: any): Team {
    const team: Team = new Team();
    team.teamKey = json.team_key;
    team.regionKey = json.region_key;
    team.leagueKey = json.league_key;
    team.teamNameShort = json.team_name_short;
    team.teamNameLong = json.team_name_long;
    team.robotName = json.robot_name;
    team.lastActive = json.last_active;
    team.city = json.city;
    team.stateProv = json.state_prov;
    team.zipCode = json.zip_code;
    team.country = json.country;
    team.rookieYear = json.rookie_year;
    team.website = json.website;
    return team;
  }

  get teamKey(): number {
    return this._teamKey;
  }

  set teamKey(value: number) {
    this._teamKey = value;
  }

  get regionKey(): string {
    return this._regionKey;
  }

  set regionKey(value: string) {
    this._regionKey = value;
  }

  get leagueKey(): string {
    return this._leagueKey;
  }

  set leagueKey(value: string) {
    this._leagueKey = value;
  }

  get teamNameShort(): string {
    return this._teamNameShort;
  }

  set teamNameShort(value: string) {
    this._teamNameShort = value;
  }

  get teamNameLong(): string {
    return this._teamNameLong;
  }

  set teamNameLong(value: string) {
    this._teamNameLong = value;
  }

  get robotName(): string {
    return this._robotName;
  }

  set robotName(value: string) {
    this._robotName = value;
  }

  get lastActive(): string {
    return this._lastActive;
  }

  set lastActive(value: string) {
    this._lastActive = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get stateProv(): string {
    return this._stateProv;
  }

  set stateProv(value: string) {
    this._stateProv = value;
  }

  get zipCode(): number {
    return this._zipCode;
  }

  set zipCode(value: number) {
    this._zipCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get rookieYear(): number {
    return this._rookieYear;
  }

  set rookieYear(value: number) {
    this._rookieYear = value;
  }

  get website(): string {
    return this._website;
  }

  set website(value: string) {
    this._website = value;
  }

  get events(): Event[] {
    return this._events;
  }

  set events(value: Event[]) {
    this._events = value;
  }

  get rankings(): Ranking[] {
    return this._rankings;
  }

  set rankings(value: Ranking[]) {
    this._rankings = value;
  }

  get awards(): AwardRecipient[] {
    return this._awards;
  }

  set awards(value: AwardRecipient[]) {
    this._awards = value;
  }

  get media(): Media[] {
    return this._media;
  }

  set media(value: Media[]) {
    this._media = value;
  }
}
