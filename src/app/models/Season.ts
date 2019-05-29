import { ISerializable } from './ISerializable';

export default class Season implements ISerializable {
  private _seasonKey: string;
  private _description: string;

  constructor() {
    this._seasonKey = '';
    this._description = '';
  }

  toJSON(): object {
    return {
      season_key: this.seasonKey,
      description: this.description
    };
  }

  fromJSON(json: any): Season {
    const season: Season = new Season();
    season.seasonKey = json.season_key;
    season.description = json.description;
    return season;
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
}
