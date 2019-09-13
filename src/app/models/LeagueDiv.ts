import {ISerializable} from './ISerializable';

export default class League implements ISerializable {
  private _divisionKey: string;
  private _leagueKey: string;
  private _regionKey: string;
  private _seasonKey: string;
  private _description: string;
  private _leagueDesc: string;

  constructor() {
    this._divisionKey = '';
    this._leagueKey = '';
    this._regionKey = '';
    this._seasonKey = '';
    this._description = '';
    this._leagueDesc = '';
  }

  toJSON(): object {
    return {
      division_key: this.divisionKey,
      league_key: this.leagueKey,
      region_key: this.regionKey,
      season_key: this.seasonKey,
      division_description: this.description,
      league_description: (this.leagueDesc && this.leagueDesc.length > 0) ? this.leagueDesc : undefined
    };
  }

  fromJSON(json: any): League {
    const league: League = new League();
    league.divisionKey = json.division_key;
    league.leagueKey = json.league_key;
    league.regionKey = json.region_key;
    league.seasonKey = json.season_key;
    league.description = json.division_description;
    league.leagueDesc = json.league_description;
    return league;
  }

  get divisionKey(): string {
    return this._divisionKey;
  }

  set divisionKey(value: string) {
    this._divisionKey = value;
  }

  get leagueKey(): string {
    return this._leagueKey;
  }

  set leagueKey(value: string) {
    this._leagueKey = value;
  }

  get regionKey(): string {
    return this._regionKey;
  }

  set regionKey(value: string) {
    this._regionKey = value;
  }

  get seasonKey(): string {
    return this._seasonKey;
  }

  set seasonKey(value: string) {
    this._seasonKey = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get leagueDesc(): string {
    return this._leagueDesc;
  }

  set leagueDesc(value: string) {
    this._leagueDesc = value;
  }
}
