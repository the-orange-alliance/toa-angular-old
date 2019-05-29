import { ISerializable } from '../ISerializable';
import MatchDetails from '../MatchDetails';

export default class RoverRuckusMatchDetails extends MatchDetails implements ISerializable {
  private _redAutoLand: number;
  private _redAutoSamp: number;
  private _redAutoClaim: number;
  private _redAutoPark: number;
  private _redDriverGold: number;
  private _redDriverSilver: number;
  private _redDriverDepot: number;
  private _redEndLatch: number;
  private _redEndIn: number;
  private _redEndComp: number;

  private _blueAutoLand: number;
  private _blueAutoSamp: number;
  private _blueAutoClaim: number;
  private _blueAutoPark: number;
  private _blueDriverGold: number;
  private _blueDriverSilver: number;
  private _blueDriverDepot: number;
  private _blueEndLatch: number;
  private _blueEndIn: number;
  private _blueEndComp: number;

  constructor() {
    super();
    this._redAutoLand = 0;
    this._redAutoSamp = 0;
    this._redAutoClaim = 0;
    this._redAutoPark = 0;
    this._redDriverGold = 0;
    this._redDriverSilver = 0;
    this._redDriverDepot = 0;
    this._redEndLatch = 0;
    this._redEndIn = 0;
    this._redEndComp = 0;

    this._blueAutoLand = 0;
    this._blueAutoSamp = 0;
    this._blueAutoClaim = 0;
    this._blueAutoPark = 0;
    this._blueDriverGold = 0;
    this._blueDriverSilver = 0;
    this._blueDriverDepot = 0;
    this._blueEndLatch = 0;
    this._blueEndIn = 0;
    this._blueEndComp = 0;
  }

  toJSON(): object {
    return {
      match_detail_key: this.matchDetailKey,
      match_key: this.matchKey,
      red_min_pen: this.redMinPen,
      blue_min_pen: this.blueMinPen,
      red_maj_pen: this.redMajPen,
      blue_maj_pen: this.blueMajPen,

      red_auto_land: this.redAutoLand,
      red_auto_samp: this.redAutoSamp,
      red_auto_claim: this.redAutoClaim,
      red_auto_park: this.redAutoPark,
      red_tele_gold: this.redDriverGold,
      red_tele_silver: this.redDriverSilver,
      red_tele_depot: this.redDriverDepot,
      red_end_latch: this.redEndLatch,
      red_end_in: this.redEndIn,
      red_end_comp: this.redEndComp,

      blue_auto_land: this.blueAutoLand,
      blue_auto_samp: this.blueAutoSamp,
      blue_auto_claim: this.blueAutoClaim,
      blue_auto_park: this.blueAutoPark,
      blue_tele_gold: this.blueDriverGold,
      blue_tele_silver: this.blueDriverSilver,
      blue_tele_depot: this.blueDriverDepot,
      blue_end_latch: this.blueEndLatch,
      blue_end_in: this.blueEndIn,
      blue_end_comp: this.blueEndComp,
    };
  }

  fromJSON(json: any): RoverRuckusMatchDetails {
    const details: RoverRuckusMatchDetails = new RoverRuckusMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;

    details.redAutoLand = json.red_auto_land;
    details.redAutoSamp = json.red_auto_samp;
    details.redAutoClaim = json.red_auto_claim;
    details.redAutoPark = json.red_auto_park;
    details.redDriverGold = json.red_tele_gold;
    details.redDriverSilver = json.red_tele_silver;
    details.redDriverDepot = json.red_tele_depot;
    details.redEndLatch = json.red_end_latch;
    details.redEndIn = json.red_end_in;
    details.redEndComp = json.red_end_comp;

    details.blueAutoLand = json.blue_auto_land;
    details.blueAutoSamp = json.blue_auto_samp;
    details.blueAutoClaim = json.blue_auto_claim;
    details.blueAutoPark = json.blue_auto_park;
    details.blueDriverGold = json.blue_tele_gold;
    details.blueDriverSilver = json.blue_tele_silver;
    details.blueDriverDepot = json.blue_tele_depot;
    details.blueEndLatch = json.blue_end_latch;
    details.blueEndIn = json.blue_end_in;
    details.blueEndComp = json.blue_end_comp;

    return details;
  }

  get redAutoLand(): number {
    return this._redAutoLand;
  }

  set redAutoLand(value: number) {
    this._redAutoLand = value;
  }

  get redAutoSamp(): number {
    return this._redAutoSamp;
  }

  set redAutoSamp(value: number) {
    this._redAutoSamp = value;
  }

  get redAutoClaim(): number {
    return this._redAutoClaim;
  }

  set redAutoClaim(value: number) {
    this._redAutoClaim = value;
  }

  get redAutoPark(): number {
    return this._redAutoPark;
  }

  set redAutoPark(value: number) {
    this._redAutoPark = value;
  }

  get redDriverGold(): number {
    return this._redDriverGold;
  }

  set redDriverGold(value: number) {
    this._redDriverGold = value;
  }

  get redDriverSilver(): number {
    return this._redDriverSilver;
  }

  set redDriverSilver(value: number) {
    this._redDriverSilver = value;
  }

  get redDriverDepot(): number {
    return this._redDriverDepot;
  }

  set redDriverDepot(value: number) {
    this._redDriverDepot = value;
  }

  get redEndLatch(): number {
    return this._redEndLatch;
  }

  set redEndLatch(value: number) {
    this._redEndLatch = value;
  }

  get redEndIn(): number {
    return this._redEndIn;
  }

  set redEndIn(value: number) {
    this._redEndIn = value;
  }

  get redEndComp(): number {
    return this._redEndComp;
  }

  set redEndComp(value: number) {
    this._redEndComp = value;
  }

  get blueAutoLand(): number {
    return this._blueAutoLand;
  }

  set blueAutoLand(value: number) {
    this._blueAutoLand = value;
  }

  get blueAutoSamp(): number {
    return this._blueAutoSamp;
  }

  set blueAutoSamp(value: number) {
    this._blueAutoSamp = value;
  }

  get blueAutoClaim(): number {
    return this._blueAutoClaim;
  }

  set blueAutoClaim(value: number) {
    this._blueAutoClaim = value;
  }

  get blueAutoPark(): number {
    return this._blueAutoPark;
  }

  set blueAutoPark(value: number) {
    this._blueAutoPark = value;
  }

  get blueDriverGold(): number {
    return this._blueDriverGold;
  }

  set blueDriverGold(value: number) {
    this._blueDriverGold = value;
  }

  get blueDriverSilver(): number {
    return this._blueDriverSilver;
  }

  set blueDriverSilver(value: number) {
    this._blueDriverSilver = value;
  }

  get blueDriverDepot(): number {
    return this._blueDriverDepot;
  }

  set blueDriverDepot(value: number) {
    this._blueDriverDepot = value;
  }

  get blueEndLatch(): number {
    return this._blueEndLatch;
  }

  set blueEndLatch(value: number) {
    this._blueEndLatch = value;
  }

  get blueEndIn(): number {
    return this._blueEndIn;
  }

  set blueEndIn(value: number) {
    this._blueEndIn = value;
  }

  get blueEndComp(): number {
    return this._blueEndComp;
  }

  set blueEndComp(value: number) {
    this._blueEndComp = value;
  }
}
