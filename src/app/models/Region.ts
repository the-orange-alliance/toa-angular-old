import { ISerializable } from './ISerializable';

export default class Region implements ISerializable {
  private _regionKey: string;
  private _description: string;

  constructor() {
    this._regionKey = '';
    this._description = '';
  }

  toJSON(): object {
    return {
      region_key: this.regionKey,
      description: this.description
    };
  }

  fromJSON(json: any): Region {
    const region: Region = new Region();
    region.regionKey = json.region_key;
    region.description = json.description;
    return region;
  }

  get regionKey(): string {
    return this._regionKey;
  }

  set regionKey(value: string) {
    this._regionKey = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
