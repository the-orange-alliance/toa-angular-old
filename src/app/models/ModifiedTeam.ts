import { ISerializable } from './ISerializable';
import Team from './Team';

export default class ModifiedTeam implements ISerializable {
  private _newTeam: Team;
  private _originalTeam: Team;
  private _discNameShort: boolean;
  private _discNameLong: boolean;
  private _discZipCode: boolean;
  private _discCity: boolean;
  private _discState: boolean;
  private _discCountry: boolean;
  private _discWebsite: boolean;

  constructor() {
    this._newTeam = new Team();
    this._originalTeam = new Team();
    this._discNameShort = false;
    this._discNameLong = false;
    this._discZipCode = false;
    this._discCity = false;
    this._discState = false;
    this._discCountry = false;
    this._discWebsite = false;
  }

  toJSON(): object {
    return this.newTeam.toJSON();
  }

  fromJSON(json: any): ModifiedTeam {
    const team: ModifiedTeam = new ModifiedTeam();
    team.newTeam = new Team().fromJSON(json);
    team.originalTeam = new Team().fromJSON(json.toa);
    team.discNameShort = json.discrepencies.team_name_short;
    team.discNameLong = json.discrepencies.team_name_long;
    team.discZipCode = json.discrepencies.zip_code;
    team.discCity = json.discrepencies.city;
    team.discState = json.discrepencies.state_prov;
    team.discCountry = json.discrepencies.country;
    team.discWebsite = json.discrepencies.website;
    return team;
  }


  get newTeam(): Team {
    return this._newTeam;
  }

  set newTeam(value: Team) {
    this._newTeam = value;
  }

  get originalTeam(): Team {
    return this._originalTeam;
  }

  set originalTeam(value: Team) {
    this._originalTeam = value;
  }

  get discNameShort(): boolean {
    return this._discNameShort;
  }

  set discNameShort(value: boolean) {
    this._discNameShort = value;
  }

  get discNameLong(): boolean {
    return this._discNameLong;
  }

  set discNameLong(value: boolean) {
    this._discNameLong = value;
  }

  get discZipCode(): boolean {
    return this._discZipCode;
  }

  set discZipCode(value: boolean) {
    this._discZipCode = value;
  }

  get discCity(): boolean {
    return this._discCity;
  }

  set discCity(value: boolean) {
    this._discCity = value;
  }

  get discState(): boolean {
    return this._discState;
  }

  set discState(value: boolean) {
    this._discState = value;
  }

  get discCountry(): boolean {
    return this._discCountry;
  }

  set discCountry(value: boolean) {
    this._discCountry = value;
  }

  get discWebsite(): boolean {
    return this._discWebsite;
  }

  set discWebsite(value: boolean) {
    this._discWebsite = value;
  }
}
