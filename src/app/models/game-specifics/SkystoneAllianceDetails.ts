import { ISerializable } from '../ISerializable';

export default class SkystoneAllianceDetails implements ISerializable {
  private _autoStone1: number;
  private _autoStone2: number;
  private _autoStone3: number;
  private _autoStone4: number;
  private _autoStone5: number;
  private _autoStone6: number;
  private _autoDelivered: number;
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
  private _towerBonusPts: number;
  private _capPts: number;
  private _parkPts: number;
  private _autoPts: number;
  private _auto: number;
  private _tele: number;
  private _end: number;
  private _penalty: number;

  constructor() {
    this._autoStone1 = -1;
    this._autoStone2 = -1;
    this._autoStone3 = -1;
    this._autoStone4 = -1;
    this._autoStone5 = -1;
    this._autoStone6 = -1;
    this._autoDelivered = -1;
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
    this._towerBonusPts = -1;
    this._capPts = -1;
    this._parkPts = -1;
    this._autoPts = -1;
    this._auto = -1;
    this._tele = -1;
    this._end = -1;
    this._penalty = -1;
  }

  toJSON(): object {
    return {
      auto_stone_1: this.stoneIntToString(this.autoStone1),
      auto_stone_2: this.stoneIntToString(this.autoStone2),
      auto_stone_3: this.stoneIntToString(this.autoStone3),
      auto_stone_4: this.stoneIntToString(this.autoStone4),
      auto_stone_5: this.stoneIntToString(this.autoStone5),
      auto_stone_6: this.stoneIntToString(this.autoStone6),
      auto_delivered: this.autoDelivered,
      auto_returned: this.autoReturned,
      first_returned_is_skystone: this.firstReturnedIsSkystone,
      auto_placed: this.autoPlaced,
      foundation_repositioned: this.foundationRepositioned,
      tele_delevered: this.teleDelivered,
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
      tower_bonus_points: this.towerBonusPts,
      tower_cap_points: this.capPts,
      tower_park_points: this.parkPts,
      auto_points: this.autoPts,
      auto_total: this.auto,
      tele_total: this.tele,
      end_total: this.end,
      penalty_total: this.penalty
    };
  }

  fromJSON(json: any): SkystoneAllianceDetails { // FROM NORMAL JSON
    const alliance: SkystoneAllianceDetails  = new SkystoneAllianceDetails();
    alliance.autoStone1 = this.stoneStringToInt(json.auto_stone_1);
    alliance.autoStone2 = this.stoneStringToInt(json.auto_stone_2);
    alliance.autoStone3 = this.stoneStringToInt(json.auto_stone_3);
    alliance.autoStone4 = this.stoneStringToInt(json.auto_stone_4);
    alliance.autoStone5 = this.stoneStringToInt(json.auto_stone_5);
    alliance.autoStone6 = this.stoneStringToInt(json.auto_stone_6);
    alliance.autoDelivered = json.auto_delivered;
    alliance.autoReturned = json.auto_returned;
    alliance.firstReturnedIsSkystone = json.first_returned_is_skystone;
    alliance.autoPlaced = json.auto_placed;
    alliance.foundationRepositioned = json.foundation_repositioned;
    alliance.teleDelivered = json.tele_delevered;
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
    alliance.towerBonusPts = json.tower_bonus_points;
    alliance.capPts = json.tower_cap_points;
    alliance.parkPts = json.tower_park_points;
    alliance.autoPts = json.auto_points;
    alliance.auto = json.auto_total;
    alliance.tele = json.tele_total;
    alliance.end = json.end_total;
    alliance.penalty = json.penalty_total;
    return alliance;
  }

  fromRedDBJson(json: any): SkystoneAllianceDetails {
    const alliance: SkystoneAllianceDetails  = new SkystoneAllianceDetails();
    alliance.autoStone1 = json.RedAutoStone1;
    alliance.autoStone2 = json.RedAutoStone2;
    alliance.autoStone3 = json.RedAutoStone3;
    alliance.autoStone4 = json.RedAutoStone4;
    alliance.autoStone5 = json.RedAutoStone5;
    alliance.autoStone6 = json.RedAutoStone6;
    alliance.autoDelivered = json.RedAutoDelivered;
    alliance.autoReturned = json.RedAutoReturned;
    alliance.firstReturnedIsSkystone = json.RedFirstReturnedIsSkystone;
    alliance.autoPlaced = json.RedAutoPlaced;
    alliance.foundationRepositioned = json.RedFoundationRepositioned;
    alliance.teleDelivered = json.RedTeleDelivered;
    alliance.teleReturned = json.RedTeleReturned;
    alliance.telePlaced = json.RedTelePlaced;
    alliance.robot1Nav = json.RedRobot1Nav;
    alliance.robot2Nav = json.RedRobot2Nav;
    alliance.robot1Parked = json.RedRobot1Parked;
    alliance.robot2Parked = json.RedRobot2Parked;
    alliance.robot1CapLevel = json.RedRobot1CapLevel;
    alliance.robot2CapLevel = json.RedRobot2CapLevel;
    alliance.foundationMoved = json.RedFoundationMoved;
    alliance.autoTransportPts = json.RedAutoTransportPts;
    alliance.autoPlacedPts = json.RedAutoPlacedPts;
    alliance.repositionPts = json.RedRepositionPts;
    alliance.navPts = json.RedNavPts;
    alliance.teleTransportPts = json.RedTeleTransportPts;
    alliance.telePlacedPts = json.RedTelePlacedPts;
    alliance.towerBonusPts = json.RedTowerBonusPts;
    alliance.capPts = json.RedCapPts;
    alliance.parkPts = json.RedParkPts;
    alliance.autoPts = json.RedAutoPts;
    alliance.auto = json.RedAuto;
    alliance.tele = json.RedTele;
    alliance.end = json.RedEnd;
    alliance.penalty = json.RedPenalty;
    return alliance;
  }

  fromBlueDBJson(json: any): SkystoneAllianceDetails {
    const alliance: SkystoneAllianceDetails  = new SkystoneAllianceDetails();
    alliance.autoStone1 = json.BlueAutoStone1;
    alliance.autoStone2 = json.BlueAutoStone2;
    alliance.autoStone3 = json.BlueAutoStone3;
    alliance.autoStone4 = json.BlueAutoStone4;
    alliance.autoStone5 = json.BlueAutoStone5;
    alliance.autoStone6 = json.BlueAutoStone6;
    alliance.autoDelivered = json.BlueAutoDelivered;
    alliance.autoReturned = json.BlueAutoReturned;
    alliance.firstReturnedIsSkystone = json.BlueFirstReturnedIsSkystone;
    alliance.autoPlaced = json.BlueAutoPlaced;
    alliance.foundationRepositioned = json.BlueFoundationRepositioned;
    alliance.teleDelivered = json.BlueTeleDelivered;
    alliance.teleReturned = json.BlueTeleReturned;
    alliance.telePlaced = json.BlueTelePlaced;
    alliance.robot1Nav = json.BlueRobot1Nav;
    alliance.robot2Nav = json.BlueRobot2Nav;
    alliance.robot1Parked = json.BlueRobot1Parked;
    alliance.robot2Parked = json.BlueRobot2Parked;
    alliance.robot1CapLevel = json.BlueRobot1CapLevel;
    alliance.robot2CapLevel = json.BlueRobot2CapLevel;
    alliance.foundationMoved = json.BlueFoundationMoved;
    alliance.autoTransportPts = json.BlueAutoTransportPts;
    alliance.autoPlacedPts = json.BlueAutoPlacedPts;
    alliance.repositionPts = json.BlueRepositionPts;
    alliance.navPts = json.BlueNavPts;
    alliance.teleTransportPts = json.BlueTeleTransportPts;
    alliance.telePlacedPts = json.BlueTelePlacedPts;
    alliance.towerBonusPts = json.BlueTowerBonusPts;
    alliance.capPts = json.BlueCapPts;
    alliance.parkPts = json.BlueParkPts;
    alliance.autoPts = json.BlueAutoPts;
    alliance.auto = json.BlueAuto;
    alliance.tele = json.BlueTele;
    alliance.end = json.BlueEnd;
    alliance.penalty = json.BluePenalty;
    return alliance;
  }

  stoneIntToString(num: number): string {
    switch (num) {
      case 0: return 'NONE';
      case 1: return 'STONE';
      case 2: return 'SKYSTONE';
      default: return 'NONE';
    }
  }
  stoneStringToInt(str: string): number {
    switch (str) {
      case 'NONE': return 0;
      case 'STONE': return 1;
      case 'SKYSTONE': return 2;
      default: return 0;
    }
  }


  get autoStone1(): number {
    return this._autoStone1;
  }

  set autoStone1(value: number) {
    this._autoStone1 = value;
  }

  get autoStone2(): number {
    return this._autoStone2;
  }

  set autoStone2(value: number) {
    this._autoStone2 = value;
  }

  get autoStone3(): number {
    return this._autoStone3;
  }

  set autoStone3(value: number) {
    this._autoStone3 = value;
  }

  get autoStone4(): number {
    return this._autoStone4;
  }

  set autoStone4(value: number) {
    this._autoStone4 = value;
  }

  get autoStone5(): number {
    return this._autoStone5;
  }

  set autoStone5(value: number) {
    this._autoStone5 = value;
  }

  get autoStone6(): number {
    return this._autoStone6;
  }

  set autoStone6(value: number) {
    this._autoStone6 = value;
  }

  get autoDelivered(): number {
    return this._autoDelivered;
  }

  set autoDelivered(value: number) {
    this._autoDelivered = value;
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

  get towerBonusPts(): number {
    return this._towerBonusPts;
  }

  set towerBonusPts(value: number) {
    this._towerBonusPts = value;
  }

  get capPts(): number {
    return this._capPts;
  }

  set capPts(value: number) {
    this._capPts = value;
  }

  get parkPts(): number {
    return this._parkPts;
  }

  set parkPts(value: number) {
    this._parkPts = value;
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
