import { ISerializable } from './ISerializable';

export default class Award implements ISerializable {
  private _awardKey: string;
  private _awardType: string;
  private _awardDescription: string;
  private _displayOrder: number;

  constructor() {
    this._awardKey = '';
    this._awardType = '';
    this._awardDescription = '';
    this._displayOrder = 0;
  }

  toJSON(): object {
    return {
      award_key: this.awardKey,
      award_type: this.awardType,
      award_description: this.awardDescription,
      display_order: this.displayOrder
    };
  }

  fromJSON(json: any): Award {
    const award: Award = new Award();
    award.awardKey = json.award_key;
    award.awardType = json.award_type;
    award.awardDescription = json.award_description;
    award.displayOrder = json.display_order;
    return award;
  }

  get awardKey(): string {
    return this._awardKey;
  }

  set awardKey(value: string) {
    this._awardKey = value;
  }

  get awardType(): string {
    return this._awardType;
  }

  set awardType(value: string) {
    this._awardType = value;
  }

  get awardDescription(): string {
    return this._awardDescription;
  }

  set awardDescription(value: string) {
    this._awardDescription = value;
  }

  get displayOrder(): number {
    return this._displayOrder;
  }

  set displayOrder(value: number) {
    this._displayOrder = value;
  }
}
