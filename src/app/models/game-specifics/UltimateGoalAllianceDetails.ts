import {ISerializable} from '../ISerializable';

export default class UltimateGoalAllianceDetails implements ISerializable {
  private _dcTowerLow: number;
  private _dcTowerMid: number;
  private _dcTowerHigh: number;
  private _navigated1: boolean;
  private _navigated2: boolean;
  private _autoTowerLow: number;
  private _autoTowerMid: number;
  private _autoTowerHigh: number;
  private _autoTowerPoints: number;
  private _autoPowerShotLeft: boolean;
  private _autoPowerShotCenter: boolean;
  private _autoPowerShotRight: boolean;
  private _autoPowerShotPoints: number;
  private _autoWobblePoints: number;
  private _wobbleRings1: number;
  private _wobbleRings2: number;
  private _wobbleEnd1: number;
  private _wobbleEnd2: number;
  private _wobbleDelivered1: boolean;
  private _wobbleDelivered2: boolean;
  private _wobbleEndPoints: number;
  private _wobbleRingPoints: number;
  private _endPowerShotLeft: boolean;
  private _endPowerShotCenter: boolean;
  private _endPowerShotRight: boolean;
  private _endPowerShotPoints: number;
  private _navPts: number;

  constructor() {
    this._dcTowerLow = -1;
    this._dcTowerMid = -1;
    this._dcTowerHigh = -1;
    this._navigated1 = false;
    this._navigated2 = false;
    this._autoTowerLow = -1;
    this._autoTowerMid = -1;
    this._autoTowerHigh = -1;
    this._autoTowerPoints = -1;
    this._autoPowerShotLeft = false;
    this._autoPowerShotCenter = false;
    this._autoPowerShotRight = false;
    this._autoPowerShotPoints = -1;
    this._autoWobblePoints = -1;
    this._wobbleRings1 = -1;
    this._wobbleRings2 = -1;
    this._wobbleEnd1 = -1;
    this._wobbleEnd2 = -1;
    this._wobbleDelivered1 = false;
    this._wobbleDelivered2 = false;
    this._wobbleEndPoints = -1;
    this._wobbleRingPoints = -1;
    this._endPowerShotLeft = false;
    this._endPowerShotCenter = false;
    this._endPowerShotRight = false;
    this._endPowerShotPoints = -1;
    this._navPts = -1;
  }

  toJSON(): object {
    return {
      auto_wobble_delivered_1: this.wobbleDelivered1,
      auto_wobble_delivered_2: this.wobbleDelivered2,
      auto_navigated_1: this.navigated1,
      auto_navigated_2: this.navigated2,
      auto_nav_pts: this.navPts,
      auto_tower_low: this.autoTowerLow,
      auto_tower_mid: this.autoTowerMid,
      auto_tower_high: this.autoTowerHigh,
      auto_tower_points: this.autoTowerPoints,
      auto_power_shot_left: this.autoPowerShotLeft,
      auto_power_shot_center: this.autoPowerShotCenter,
      auto_power_shot_right: this.autoPowerShotRight,
      auto_power_shot_points: this.autoPowerShotPoints,
      auto_wobble_points: this.autoWobblePoints,
      tele_tower_low: this.dcTowerLow,
      tele_tower_mid: this.dcTowerMid,
      tele_tower_high: this.dcTowerHigh,
      end_wobble_rings_1: this.wobbleRings1,
      end_wobble_rings_2: this.wobbleRings2,
      end_wobble_1: this.wobbleEnd1,
      end_wobble_2: this.wobbleEnd2,
      end_wobble_points: this.wobbleEndPoints,
      end_wobble_ring_points: this.wobbleRingPoints,
      end_power_shot_left: this.endPowerShotLeft,
      end_power_shot_center: this.endPowerShotCenter,
      end_power_shot_right: this.endPowerShotRight,
      end_power_shot_points: this.endPowerShotPoints
    };
  }

  fromJSON(json: any): UltimateGoalAllianceDetails {
    const alliance: UltimateGoalAllianceDetails  = new UltimateGoalAllianceDetails();
    alliance.dcTowerLow = json.tele_tower_low;
    alliance.dcTowerMid = json.tele_tower_mid;
    alliance.dcTowerHigh = json.tele_tower_high;
    alliance.navigated1 = json.auto_navigated_1;
    alliance.navigated2 = json.auto_navigated_2;
    alliance.autoTowerLow = json.auto_tower_low;
    alliance.autoTowerMid = json.auto_tower_mid;
    alliance.autoTowerHigh = json.auto_tower_high;
    alliance.autoTowerPoints = json.auto_tower_points;
    alliance.autoPowerShotLeft = json.auto_power_shot_left;
    alliance.autoPowerShotCenter = json.auto_power_shot_center;
    alliance.autoPowerShotRight = json.auto_power_shot_right;
    alliance.autoPowerShotPoints = json.auto_power_shot_points;
    alliance.autoWobblePoints = json.auto_wobble_points;
    alliance.wobbleRings1 = json.end_wobble_rings_1;
    alliance.wobbleRings2 = json.end_wobble_rings_2;
    alliance.wobbleEnd1 = json.end_wobble_1;
    alliance.wobbleEnd2 = json.end_wobble_2;
    alliance.wobbleDelivered1 = json.auto_wobble_delivered_1;
    alliance.wobbleDelivered2 = json.auto_wobble_delivered_2;
    alliance.wobbleEndPoints = json.end_wobble_points;
    alliance.wobbleRingPoints = json.end_wobble_ring_points;
    alliance.endPowerShotLeft = json.end_power_shot_left;
    alliance.endPowerShotCenter = json.end_power_shot_center;
    alliance.endPowerShotRight = json.end_power_shot_right;
    alliance.endPowerShotPoints = json.end_power_shot_points;
    return alliance;
  }

  get dcTowerLow(): number {
    return this._dcTowerLow;
  }

  set dcTowerLow(value: number) {
    this._dcTowerLow = value;
  }

  get dcTowerMid(): number {
    return this._dcTowerMid;
  }

  set dcTowerMid(value: number) {
    this._dcTowerMid = value;
  }

  get dcTowerHigh(): number {
    return this._dcTowerHigh;
  }

  set dcTowerHigh(value: number) {
    this._dcTowerHigh = value;
  }

  get navigated1(): boolean {
    return this._navigated1;
  }

  set navigated1(value: boolean) {
    this._navigated1 = value;
  }

  get navigated2(): boolean {
    return this._navigated2;
  }

  set navigated2(value: boolean) {
    this._navigated2 = value;
  }

  get autoTowerLow(): number {
    return this._autoTowerLow;
  }

  set autoTowerLow(value: number) {
    this._autoTowerLow = value;
  }

  get autoTowerMid(): number {
    return this._autoTowerMid;
  }

  set autoTowerMid(value: number) {
    this._autoTowerMid = value;
  }

  get autoTowerHigh(): number {
    return this._autoTowerHigh;
  }

  set autoTowerHigh(value: number) {
    this._autoTowerHigh = value;
  }

  get autoTowerPoints(): number {
    return this._autoTowerPoints;
  }

  set autoTowerPoints(value: number) {
    this._autoTowerPoints = value;
  }

  get autoPowerShotLeft(): boolean {
    return this._autoPowerShotLeft;
  }

  set autoPowerShotLeft(value: boolean) {
    this._autoPowerShotLeft = value;
  }

  get autoPowerShotCenter(): boolean {
    return this._autoPowerShotCenter;
  }

  set autoPowerShotCenter(value: boolean) {
    this._autoPowerShotCenter = value;
  }

  get autoPowerShotRight(): boolean {
    return this._autoPowerShotRight;
  }

  set autoPowerShotRight(value: boolean) {
    this._autoPowerShotRight = value;
  }

  get autoPowerShotPoints(): number {
    return this._autoPowerShotPoints;
  }

  set autoPowerShotPoints(value: number) {
    this._autoPowerShotPoints = value;
  }

  get autoWobblePoints(): number {
    return this._autoWobblePoints;
  }

  set autoWobblePoints(value: number) {
    this._autoWobblePoints = value;
  }

  get wobbleRings1(): number {
    return this._wobbleRings1;
  }

  set wobbleRings1(value: number) {
    this._wobbleRings1 = value;
  }

  get wobbleRings2(): number {
    return this._wobbleRings2;
  }

  set wobbleRings2(value: number) {
    this._wobbleRings2 = value;
  }

  get wobbleEnd1(): number {
    return this._wobbleEnd1;
  }

  set wobbleEnd1(value: number) {
    this._wobbleEnd1 = value;
  }

  get wobbleEnd2(): number {
    return this._wobbleEnd2;
  }

  set wobbleEnd2(value: number) {
    this._wobbleEnd2 = value;
  }

  get wobbleDelivered1(): boolean {
    return this._wobbleDelivered1;
  }

  set wobbleDelivered1(value: boolean) {
    this._wobbleDelivered1 = value;
  }

  get wobbleDelivered2(): boolean {
    return this._wobbleDelivered2;
  }

  set wobbleDelivered2(value: boolean) {
    this._wobbleDelivered2 = value;
  }

  get wobbleEndPoints(): number {
    return this._wobbleEndPoints;
  }

  set wobbleEndPoints(value: number) {
    this._wobbleEndPoints = value;
  }

  get wobbleRingPoints(): number {
    return this._wobbleRingPoints;
  }

  set wobbleRingPoints(value: number) {
    this._wobbleRingPoints = value;
  }

  get endPowerShotLeft(): boolean {
    return this._endPowerShotLeft;
  }

  set endPowerShotLeft(value: boolean) {
    this._endPowerShotLeft = value;
  }

  get endPowerShotCenter(): boolean {
    return this._endPowerShotCenter;
  }

  set endPowerShotCenter(value: boolean) {
    this._endPowerShotCenter = value;
  }

  get endPowerShotRight(): boolean {
    return this._endPowerShotRight;
  }

  set endPowerShotRight(value: boolean) {
    this._endPowerShotRight = value;
  }

  get endPowerShotPoints(): number {
    return this._endPowerShotPoints;
  }

  set endPowerShotPoints(value: number) {
    this._endPowerShotPoints = value;
  }

  get navPts(): number {
    return this._navPts;
  }

  set navPts(value: number) {
    this._navPts = value;
  }
}
