import { ISerializable } from '../ISerializable';
import MatchDetails from '../MatchDetails';

export default class RelicRecoveryMatchDetails extends MatchDetails implements ISerializable {
  private _redAutoJewels: number;
  private _redAutoGlyphs: number;
  private _redAutoKeys: number;
  private _redAutoParks: number;
  private _redTeleGlyphs: number;
  private _redTeleRows: number;
  private _redTeleColumns: number;
  private _redTeleCypher: number;
  private _redEndRelic1: number;
  private _redEndRelic2: number;
  private _redEndRelic3: number;
  private _redEndRelicStanding: number;
  private _redEndRobotBalances: number;

  private _blueAutoJewels: number;
  private _blueAutoGlyphs: number;
  private _blueAutoKeys: number;
  private _blueAutoParks: number;
  private _blueTeleGlyphs: number;
  private _blueTeleRows: number;
  private _blueTeleColumns: number;
  private _blueTeleCypher: number;
  private _blueEndRelic1: number;
  private _blueEndRelic2: number;
  private _blueEndRelic3: number;
  private _blueEndRelicStanding: number;
  private _blueEndRobotBalances: number;

  constructor() {
    super();
    this._redAutoJewels = 0;
    this._redAutoGlyphs = 0;
    this._redAutoKeys = 0;
    this._redAutoParks = 0;
    this._redTeleGlyphs = 0;
    this._redTeleRows = 0;
    this._redTeleColumns = 0;
    this._redTeleCypher = 0;
    this._redEndRelic1 = 0;
    this._redEndRelic2 = 0;
    this._redEndRelic3 = 0;
    this._redEndRelicStanding = 0;
    this._redEndRobotBalances = 0;
    this._blueAutoJewels = 0;
    this._blueAutoGlyphs = 0;
    this._blueAutoKeys = 0;
    this._blueAutoParks = 0;
    this._blueTeleGlyphs = 0;
    this._blueTeleRows = 0;
    this._blueTeleColumns = 0;
    this._blueTeleCypher = 0;
    this._blueEndRelic1 = 0;
    this._blueEndRelic2 = 0;
    this._blueEndRelic3 = 0;
    this._blueEndRelicStanding = 0;
    this._blueEndRobotBalances = 0;
  }

  toJSON(): object {
    return {
      match_detail_key: this.matchDetailKey,
      match_key: this.matchKey,
      red_min_pen: this.redMinPen,
      blue_min_pen: this.blueMinPen,
      red_maj_pen: this.redMajPen,
      blue_maj_pen: this.blueMajPen,
      red_auto_jewels: this.redAutoJewels,
      red_auto_glyphs: this.redAutoGlyphs,
      red_auto_keys: this.redAutoKeys,
      red_auto_parks: this.redAutoParks,
      red_tele_glyphs: this.redTeleGlyphs,
      red_tele_rows: this.redTeleRows,
      red_tele_cols: this.redTeleColumns,
      red_tele_cyphers: this.redTeleCypher,
      red_end_relic_1: this.redEndRelic1,
      red_end_relic_2: this.redEndRelic2,
      red_end_relic_3: this.redEndRelic3,
      red_end_relic_standing: this.redEndRelicStanding,
      red_end_robot_balances: this.redEndRobotBalances,
      blue_auto_jewels: this.blueAutoJewels,
      blue_auto_glyphs: this.blueAutoGlyphs,
      blue_auto_keys: this.blueAutoKeys,
      blue_auto_parks: this.blueAutoParks,
      blue_tele_glyphs: this.blueTeleGlyphs,
      blue_tele_rows: this.blueTeleRows,
      blue_tele_cols: this.blueTeleColumns,
      blue_tele_cyphers: this.blueTeleCypher,
      blue_end_relic_1: this.blueEndRelic1,
      blue_end_relic_2: this.blueEndRelic2,
      blue_end_relic_3: this.blueEndRelic3,
      blue_end_relic_standing: this.blueEndRelicStanding,
      blue_end_robot_balances: this.blueEndRobotBalances
    };
  }

  fromJSON(json: any): RelicRecoveryMatchDetails {
    const details: RelicRecoveryMatchDetails = new RelicRecoveryMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;
    details.redAutoJewels = json.red_auto_jewels;
    details.redAutoGlyphs = json.red_auto_glyphs;
    details.redAutoKeys = json.red_auto_keys;
    details.redAutoParks = json.red_auto_parks;
    details.redTeleGlyphs = json.red_tele_glyphs;
    details.redTeleRows = json.red_tele_rows;
    details.redTeleColumns = json.red_tele_cols;
    details.redTeleCypher = json.red_tele_cyphers;
    details.redEndRelic1 = json.red_end_relic_1;
    details.redEndRelic2 = json.red_end_relic_2;
    details.redEndRelic3 = json.red_end_relic_3;
    details.redEndRelicStanding = json.red_end_relic_standing;
    details.redEndRobotBalances = json.red_end_robot_balances;
    details.blueAutoJewels = json.blue_auto_jewels;
    details.blueAutoGlyphs = json.blue_auto_glyphs;
    details.blueAutoKeys = json.blue_auto_keys;
    details.blueAutoParks = json.blue_auto_parks;
    details.blueTeleGlyphs = json.blue_tele_glyphs;
    details.blueTeleRows = json.blue_tele_rows;
    details.blueTeleColumns = json.blue_tele_cols;
    details.blueTeleCypher = json.blue_tele_cyphers;
    details.blueEndRelic1 = json.blue_end_relic_1;
    details.blueEndRelic2 = json.blue_end_relic_2;
    details.blueEndRelic3 = json.blue_end_relic_3;
    details.blueEndRelicStanding = json.blue_end_relic_standing;
    details.blueEndRobotBalances = json.blue_end_robot_balances;
    return details;
  }

  get redAutoJewels(): number {
    return this._redAutoJewels;
  }

  set redAutoJewels(value: number) {
    this._redAutoJewels = value;
  }

  get redAutoGlyphs(): number {
    return this._redAutoGlyphs;
  }

  set redAutoGlyphs(value: number) {
    this._redAutoGlyphs = value;
  }

  get redAutoKeys(): number {
    return this._redAutoKeys;
  }

  set redAutoKeys(value: number) {
    this._redAutoKeys = value;
  }

  get redAutoParks(): number {
    return this._redAutoParks;
  }

  set redAutoParks(value: number) {
    this._redAutoParks = value;
  }

  get redTeleGlyphs(): number {
    return this._redTeleGlyphs;
  }

  set redTeleGlyphs(value: number) {
    this._redTeleGlyphs = value;
  }

  get redTeleRows(): number {
    return this._redTeleRows;
  }

  set redTeleRows(value: number) {
    this._redTeleRows = value;
  }

  get redTeleColumns(): number {
    return this._redTeleColumns;
  }

  set redTeleColumns(value: number) {
    this._redTeleColumns = value;
  }

  get redTeleCypher(): number {
    return this._redTeleCypher;
  }

  set redTeleCypher(value: number) {
    this._redTeleCypher = value;
  }

  get redEndRelic1(): number {
    return this._redEndRelic1;
  }

  set redEndRelic1(value: number) {
    this._redEndRelic1 = value;
  }

  get redEndRelic2(): number {
    return this._redEndRelic2;
  }

  set redEndRelic2(value: number) {
    this._redEndRelic2 = value;
  }

  get redEndRelic3(): number {
    return this._redEndRelic3;
  }

  set redEndRelic3(value: number) {
    this._redEndRelic3 = value;
  }

  get redEndRelicStanding(): number {
    return this._redEndRelicStanding;
  }

  set redEndRelicStanding(value: number) {
    this._redEndRelicStanding = value;
  }

  get redEndRobotBalances(): number {
    return this._redEndRobotBalances;
  }

  set redEndRobotBalances(value: number) {
    this._redEndRobotBalances = value;
  }

  get blueAutoJewels(): number {
    return this._blueAutoJewels;
  }

  set blueAutoJewels(value: number) {
    this._blueAutoJewels = value;
  }

  get blueAutoGlyphs(): number {
    return this._blueAutoGlyphs;
  }

  set blueAutoGlyphs(value: number) {
    this._blueAutoGlyphs = value;
  }

  get blueAutoKeys(): number {
    return this._blueAutoKeys;
  }

  set blueAutoKeys(value: number) {
    this._blueAutoKeys = value;
  }

  get blueAutoParks(): number {
    return this._blueAutoParks;
  }

  set blueAutoParks(value: number) {
    this._blueAutoParks = value;
  }

  get blueTeleGlyphs(): number {
    return this._blueTeleGlyphs;
  }

  set blueTeleGlyphs(value: number) {
    this._blueTeleGlyphs = value;
  }

  get blueTeleRows(): number {
    return this._blueTeleRows;
  }

  set blueTeleRows(value: number) {
    this._blueTeleRows = value;
  }

  get blueTeleColumns(): number {
    return this._blueTeleColumns;
  }

  set blueTeleColumns(value: number) {
    this._blueTeleColumns = value;
  }

  get blueTeleCypher(): number {
    return this._blueTeleCypher;
  }

  set blueTeleCypher(value: number) {
    this._blueTeleCypher = value;
  }

  get blueEndRelic1(): number {
    return this._blueEndRelic1;
  }

  set blueEndRelic1(value: number) {
    this._blueEndRelic1 = value;
  }

  get blueEndRelic2(): number {
    return this._blueEndRelic2;
  }

  set blueEndRelic2(value: number) {
    this._blueEndRelic2 = value;
  }

  get blueEndRelic3(): number {
    return this._blueEndRelic3;
  }

  set blueEndRelic3(value: number) {
    this._blueEndRelic3 = value;
  }

  get blueEndRelicStanding(): number {
    return this._blueEndRelicStanding;
  }

  set blueEndRelicStanding(value: number) {
    this._blueEndRelicStanding = value;
  }

  get blueEndRobotBalances(): number {
    return this._blueEndRobotBalances;
  }

  set blueEndRobotBalances(value: number) {
    this._blueEndRobotBalances = value;
  }
}
