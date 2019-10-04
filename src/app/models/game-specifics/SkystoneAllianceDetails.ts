import { ISerializable } from '../ISerializable';

export enum Stone {
  'NONE',
  'STONE',
  'SKYSTONE'
}

export default class SkystoneAllianceDetails implements ISerializable {
  private _autoStone1: Stone;
  private _autoStone2: Stone;
  private _autoStone3: Stone;
  private _autoStone4: Stone;
  private _autoStone5: Stone;
  private _autoStone6: Stone;
  private _autoDeliveredSkystones: number;
  private _autoDeliveredStones: number;
  private _autoReturned: number;
  private _firstReturnedIsSkystone: boolean;
  private _autoPlaced: number;
  private _foundationRepositioned: boolean;
  private _teleDelivered: number;
  private _teleReturned: number;
  private _telePlaced: number;
  private _robot1Nav: boolean;
  private _robot2Nav: boolean;
  private _robot1Parked: boolean;
  private _robot2Parked: boolean;
  private _robot1CapLevel: number;
  private _robot2CapLevel: number;
  private _foundationMoved: boolean;
  private _autoTransportPts: number;
  private _autoPlacedPts: number;
  private _repositionPts: number;
  private _navPts: number;
  private _teleTransportPts: number;
  private _telePlacedPts: number;
  private _towerBonus: number;
  private _cappingBonus: number;
  private _levelBonus: number;
  private _endRobotsParked: number;
  private _autoPts: number;
  private _auto: number;
  private _tele: number;
  private _end: number;
  private _penalty: number;

  constructor() {
    this._autoStone1 = null;
    this._autoStone2 = null;
    this._autoStone3 = null;
    this._autoStone4 = null;
    this._autoStone5 = null;
    this._autoStone6 = null;
    this._autoDeliveredSkystones = -1;
    this._autoDeliveredStones = -1;
    this._autoReturned = -1;
    this._firstReturnedIsSkystone = false;
    this._autoPlaced = -1;
    this._foundationRepositioned = false;
    this._teleDelivered = -1;
    this._teleReturned = -1;
    this._telePlaced = -1;
    this._robot1Nav = false;
    this._robot2Nav = false;
    this._robot1Parked = false;
    this._robot2Parked = false;
    this._robot1CapLevel = -1;
    this._robot2CapLevel = -1;
    this._foundationMoved = false;
    this._autoTransportPts = -1;
    this._autoPlacedPts = -1;
    this._repositionPts = -1;
    this._navPts = -1;
    this._teleTransportPts = -1;
    this._telePlacedPts = -1;
    this._towerBonus = -1;
    this._cappingBonus = -1;
    this._levelBonus = -1;
    this._endRobotsParked = -1;
    this._autoPts = -1;
    this._auto = -1;
    this._tele = -1;
    this._end = -1;
    this._penalty = -1;
  }

  toJSON(): object {
    return {
      auto_stone_1: Stone[this.autoStone1],
      auto_stone_2: Stone[this.autoStone1],
      auto_stone_3: Stone[this.autoStone1],
      auto_stone_4: Stone[this.autoStone1],
      auto_stone_5: Stone[this.autoStone1],
      auto_stone_6: Stone[this.autoStone1],
      auto_delivered_skystones: this.autoDeliveredSkystones,
      auto_delivered_stones: this.autoDeliveredStones,
      auto_returned: this.autoReturned,
      first_returned_is_skystone: this.firstReturnedIsSkystone,
      auto_placed: this.autoPlaced,
      foundation_repositioned: this.foundationRepositioned,
      tele_delivered: this.teleDelivered,
      tele_returned: this.teleReturned,
      tele_placed: this.telePlaced,
      robot_1: {
        nav: this.robot1Nav,
        parked: this.robot1Parked,
        cap_level: this.robot1CapLevel
      },
      robot_2: {
        nav: this.robot2Nav,
        parked: this.robot2Parked,
        cap_level: this.robot2CapLevel
      },
      foundation_moved: this.foundationMoved,
      auto_transport_points: this.autoTransportPts,
      auto_placed_points: this.autoPlacedPts,
      reposition_points: this.repositionPts,
      nav_points: this.navPts,
      tele_transport_points: this.teleTransportPts,
      tele_placed_points: this.telePlacedPts,
      tower_bonus: this.towerBonus,
      tower_capping_bonus: this.cappingBonus,
      tower_level_bonus: this.levelBonus,
      end_robots_parked: this.endRobotsParked,
      auto_points: this.autoPts,
      auto_total: this.auto,
      tele_total: this.tele,
      end_total: this.end,
      penalty_total: this.penalty
    };
  }

  fromJSON(json: any): SkystoneAllianceDetails {
    const alliance: SkystoneAllianceDetails  = new SkystoneAllianceDetails();
    alliance.autoStone1 = this.intToStone(json.auto_stone_1);
    alliance.autoStone2 = this.intToStone(json.auto_stone_2);
    alliance.autoStone3 = this.intToStone(json.auto_stone_3);
    alliance.autoStone4 = this.intToStone(json.auto_stone_4);
    alliance.autoStone5 = this.intToStone(json.auto_stone_5);
    alliance.autoStone6 = this.intToStone(json.auto_stone_6);
    alliance.autoDeliveredSkystones = json.auto_delivered_skystones;
    alliance.autoDeliveredStones = json.auto_delivered_stones;
    alliance.autoReturned = json.auto_returned;
    alliance.firstReturnedIsSkystone = json.first_returned_is_skystone;
    alliance.autoPlaced = json.auto_placed;
    alliance.foundationRepositioned = json.foundation_repositioned;
    alliance.teleDelivered = json.tele_delivered;
    alliance.teleReturned = json.tele_returned;
    alliance.telePlaced = json.tele_placed;
    alliance.robot1Nav = json.robot_1.nav;
    alliance.robot2Nav = json.robot_2.nav;
    alliance.robot1Parked = json.robot_1.parked;
    alliance.robot2Parked = json.robot_2.parked;
    alliance.robot1CapLevel = json.robot_1.cap_level;
    alliance.robot2CapLevel = json.robot_2.cap_level;
    alliance.foundationMoved = json.foundation_moved;
    alliance.autoTransportPts = json.auto_transport_points;
    alliance.autoPlacedPts = json.auto_placed_points;
    alliance.repositionPts = json.reposition_points;
    alliance.navPts = json.nav_points;
    alliance.teleTransportPts = json.tele_transport_points;
    alliance.telePlacedPts = json.tele_placed_points;
    alliance.towerBonus = json.tower_bonus;
    alliance.cappingBonus = json.tower_capping_bonus;
    alliance.levelBonus = json.tower_level_bonus;
    alliance.endRobotsParked = json.end_robots_parked;
    alliance.autoPts = json.auto_points;
    alliance.auto = json.auto_total;
    alliance.tele = json.tele_total;
    alliance.end = json.end_total;
    alliance.penalty = json.penalty_total;
    return alliance;
  }

  intToStone(num: number): Stone {
    return Stone[Object.keys(Stone).find(x => Stone[x] === num)];
  }

  get autoStone1(): Stone {
    return this._autoStone1;
  }

  set autoStone1(value: Stone) {
    this._autoStone1 = value;
  }

  get autoStone2(): Stone {
    return this._autoStone2;
  }

  set autoStone2(value: Stone) {
    this._autoStone2 = value;
  }

  get autoStone3(): Stone {
    return this._autoStone3;
  }

  set autoStone3(value: Stone) {
    this._autoStone3 = value;
  }

  get autoStone4(): Stone {
    return this._autoStone4;
  }

  set autoStone4(value: Stone) {
    this._autoStone4 = value;
  }

  get autoStone5(): Stone {
    return this._autoStone5;
  }

  set autoStone5(value: Stone) {
    this._autoStone5 = value;
  }

  get autoStone6(): Stone {
    return this._autoStone6;
  }

  set autoStone6(value: Stone) {
    this._autoStone6 = value;
  }

  get autoDeliveredSkystones(): number {
    return this._autoDeliveredSkystones;
  }

  set autoDeliveredSkystones(value: number) {
    this._autoDeliveredSkystones = value;
  }

  get autoDeliveredStones(): number {
    return this._autoDeliveredStones;
  }

  set autoDeliveredStones(value: number) {
    this._autoDeliveredStones = value;
  }

  get autoReturned(): number {
    return this._autoReturned;
  }

  set autoReturned(value: number) {
    this._autoReturned = value;
  }

  get firstReturnedIsSkystone(): boolean {
    return this._firstReturnedIsSkystone;
  }

  set firstReturnedIsSkystone(value: boolean) {
    this._firstReturnedIsSkystone = value;
  }

  get autoPlaced(): number {
    return this._autoPlaced;
  }

  set autoPlaced(value: number) {
    this._autoPlaced = value;
  }

  get foundationRepositioned(): boolean {
    return this._foundationRepositioned;
  }

  set foundationRepositioned(value: boolean) {
    this._foundationRepositioned = value;
  }

  get teleDelivered(): number {
    return this._teleDelivered;
  }

  set teleDelivered(value: number) {
    this._teleDelivered = value;
  }

  get teleReturned(): number {
    return this._teleReturned;
  }

  set teleReturned(value: number) {
    this._teleReturned = value;
  }

  get telePlaced(): number {
    return this._telePlaced;
  }

  set telePlaced(value: number) {
    this._telePlaced = value;
  }

  get robot1Nav(): boolean {
    return this._robot1Nav;
  }

  set robot1Nav(value: boolean) {
    this._robot1Nav = value;
  }

  get robot2Nav(): boolean {
    return this._robot2Nav;
  }

  set robot2Nav(value: boolean) {
    this._robot2Nav = value;
  }

  get robot1Parked(): boolean {
    return this._robot1Parked;
  }

  set robot1Parked(value: boolean) {
    this._robot1Parked = value;
  }

  get robot2Parked(): boolean {
    return this._robot2Parked;
  }

  set robot2Parked(value: boolean) {
    this._robot2Parked = value;
  }

  get robot1CapLevel(): number {
    return this._robot1CapLevel;
  }

  set robot1CapLevel(value: number) {
    this._robot1CapLevel = value;
  }

  get robot2CapLevel(): number {
    return this._robot2CapLevel;
  }

  set robot2CapLevel(value: number) {
    this._robot2CapLevel = value;
  }

  get foundationMoved(): boolean {
    return this._foundationMoved;
  }

  set foundationMoved(value: boolean) {
    this._foundationMoved = value;
  }

  get autoTransportPts(): number {
    return this._autoTransportPts;
  }

  set autoTransportPts(value: number) {
    this._autoTransportPts = value;
  }

  get autoPlacedPts(): number {
    return this._autoPlacedPts;
  }

  set autoPlacedPts(value: number) {
    this._autoPlacedPts = value;
  }

  get repositionPts(): number {
    return this._repositionPts;
  }

  set repositionPts(value: number) {
    this._repositionPts = value;
  }

  get navPts(): number {
    return this._navPts;
  }

  set navPts(value: number) {
    this._navPts = value;
  }

  get teleTransportPts(): number {
    return this._teleTransportPts;
  }

  set teleTransportPts(value: number) {
    this._teleTransportPts = value;
  }

  get telePlacedPts(): number {
    return this._telePlacedPts;
  }

  set telePlacedPts(value: number) {
    this._telePlacedPts = value;
  }

  get towerBonus(): number {
    return this._towerBonus;
  }

  set towerBonus(value: number) {
    this._towerBonus = value;
  }

  get cappingBonus(): number {
    return this._cappingBonus;
  }

  set cappingBonus(value: number) {
    this._cappingBonus = value;
  }

  get levelBonus(): number {
    return this._levelBonus;
  }

  set levelBonus(value: number) {
    this._levelBonus = value;
  }

  get endRobotsParked(): number {
    return this._endRobotsParked;
  }

  set endRobotsParked(value: number) {
    this._endRobotsParked = value;
  }

  get autoPts(): number {
    return this._autoPts;
  }

  set autoPts(value: number) {
    this._autoPts = value;
  }

  get auto(): number {
    return this._auto;
  }

  set auto(value: number) {
    this._auto = value;
  }

  get tele(): number {
    return this._tele;
  }

  set tele(value: number) {
    this._tele = value;
  }

  get end(): number {
    return this._end;
  }

  set end(value: number) {
    this._end = value;
  }

  get penalty(): number {
    return this._penalty;
  }

  set penalty(value: number) {
    this._penalty = value;
  }
}
