import { DataSnapshot } from '@angular/fire/database/interfaces';

export default class User implements ISerializable {

  private _name: string;
  private _level: number;
  private _team: string;
  private _apiKey: string;
  private _favTeams: string[];
  private _favEvents: string[];
  private _adminEvents: string[];

  firebaseUser: firebase.User = null;

  constructor() {
    this._name = '';
    this._level = 1;
    this._team = '';
    this._apiKey = '';
    this._favTeams = [];
    this._favEvents = [];
    this._adminEvents = [];
  }

  toJSON(): object {
    return {
      fullName: this.name,
      level: this.level,
      team: this.team,
      APIKey: this.apiKey,
      favTeams: this.favTeams,
      favEvents: this.favEvents,
      adminEvents: this.adminEvents
    };
  }

  fromJSON(json: any): User {
    const user: User = new User();
    user.name = json.fullName;
    user.level = json.level || 1;
    user.team = json.team;
    user.apiKey = json.APIKey;
    user.favTeams = json.favTeams;
    user.favEvents = json.favEvents;
    user.adminEvents = json.adminEvents;
    return user;
  }

  fromSnapshot(items: DataSnapshot): User {
    return this.fromJSON(items.val());
  }

  getFavTeams(): string[] {
    let teams: string[] = [];
    for (const key in this.favTeams) {
      if (this.favTeams[key]) {
        teams.push(key);
      }
    }
    return teams;
  }

  getFavEvents(): string[] {
    let events: string[] = [];
    for (const key in this.favEvents) {
      if (this.favEvents[key]) {
        events.push(key);
      }
    }
    return events;
  }

  getAdminEvents(): string[] {
    let events: string[] = [];
    for (const key in this.adminEvents) {
      if (this.adminEvents[key]) {
        events.push(key);
      }
    }
    return events;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get level(): number {
    return this._level || 1;
  }

  set level(value: number) {
    this._level = value || 1;
  }

  get apiKey(): string {
    return this._apiKey;
  }

  set team(value: string) {
    this._team = value;
  }

  get team(): string {
    return this._team;
  }

  set apiKey(value: string) {
    this._apiKey = value;
  }

  get favTeams(): string[] {
    return this._favTeams || [];
  }

  set favTeams(value: string[]) {
    this._favTeams = value || [];
  }

  get favEvents(): string[] {
    return this._favEvents || [];
  }

  set favEvents(value: string[]) {
    this._favEvents = value || [];
  }

  get adminEvents(): string[] {
    return this._adminEvents || [];
  }

  set adminEvents(value: string[]) {
    this._adminEvents = value || [];
  }
}
