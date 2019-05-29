import { ISerializable } from './ISerializable';

export default class TeamSeasonRecord implements ISerializable {
  private _wins: number;
  private _losses: number;
  private _ties: number;

  constructor() {
    this._wins = 0;
    this._losses = 0;
    this._ties = 0;
  }

  toJSON(): object {
    return {
      wins: this.wins,
      losses: this.losses,
      ties: this.ties,
    };
  }

  fromJSON(json: any): TeamSeasonRecord {
    const teamSeasonRecord: TeamSeasonRecord = new TeamSeasonRecord();
    teamSeasonRecord.wins = json.wins;
    teamSeasonRecord.ties = json.ties;
    teamSeasonRecord.losses = json.losses;
    return teamSeasonRecord;
  }


  get wins(): number {
    return this._wins;
  }

  set wins(value: number) {
    this._wins = value;
  }

  get losses(): number {
    return this._losses;
  }

  set losses(value: number) {
    this._losses = value;
  }

  get ties(): number {
    return this._ties;
  }

  set ties(value: number) {
    this._ties = value;
  }
}
