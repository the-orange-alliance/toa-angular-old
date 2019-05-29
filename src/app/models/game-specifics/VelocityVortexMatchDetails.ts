import { ISerializable } from '../ISerializable';
import MatchDetails from '../MatchDetails';

export default class VelocityVortexMatchDetails extends MatchDetails implements ISerializable {
  private _redAutoBeacons: number;
  private _redAutoCap: boolean;
  private _redAutoPartCen: number;
  private _redAutoPartCor: number;
  private _redAutoRobot1: number;
  private _redAutoRobot2: number;
  private _redTeleBeacons: number;
  private _redTelePartCen: number;
  private _redTelePartCor: number;
  private _redTeleCap: number;

  private _blueAutoBeacons: number;
  private _blueAutoCap: boolean;
  private _blueAutoPartCen: number;
  private _blueAutoPartCor: number;
  private _blueAutoRobot1: number;
  private _blueAutoRobot2: number;
  private _blueTeleBeacons: number;
  private _blueTelePartCen: number;
  private _blueTelePartCor: number;
  private _blueTeleCap: number;

  constructor() {
    super();
    this._redAutoBeacons = 0;
    this._redAutoCap = false;
    this._redAutoPartCen = 0;
    this._redAutoPartCor = 0;
    this._redAutoRobot1 = 0;
    this._redAutoRobot2 = 0;
    this._redTeleBeacons = 0;
    this._redTelePartCen = 0;
    this._redTelePartCor = 0;
    this._redTeleCap = 0;
    this._blueAutoBeacons = 0;
    this._blueAutoCap = false;
    this._blueAutoPartCen = 0;
    this._blueAutoPartCor = 0;
    this._blueAutoRobot1 = 0;
    this._blueAutoRobot2 = 0;
    this._blueTeleBeacons = 0;
    this._blueTelePartCen = 0;
    this._blueTelePartCor = 0;
    this._blueTeleCap = 0;
  }

  public toJSON(): object {
    return {
      match_detail_key: this.matchDetailKey,
      match_key: this.matchKey,
      red_min_pen: this.redMinPen,
      blue_min_pen: this.blueMinPen,
      red_maj_pen: this.redMajPen,
      blue_maj_pen: this.blueMajPen,
      red_auto_beacons: this.redAutoBeacons,
      red_auto_cap: this.redAutoCap,
      red_auto_part_cen: this.redAutoPartCen,
      red_auto_part_cor: this.redAutoPartCor,
      red_auto_robot_1: this.redAutoRobot1,
      red_auto_robot_2: this.redAutoRobot2,
      red_tele_beacons: this.redTeleBeacons,
      red_tele_part_cen: this.redTelePartCen,
      red_tele_part_cor: this.redTelePartCor,
      red_tele_cap: this.redTeleCap,
      blue_auto_beacons: this.blueAutoBeacons,
      blue_auto_cap: this.blueAutoCap,
      blue_auto_part_cen: this.blueAutoPartCen,
      blue_auto_part_cor: this.blueAutoPartCor,
      blue_auto_robot_1: this.blueAutoRobot1,
      blue_auto_robot_2: this.blueAutoRobot2,
      blue_tele_beacons: this.blueTeleBeacons,
      blue_tele_part_cen: this.blueTelePartCen,
      blue_tele_part_cor: this.blueTelePartCor,
      blue_tele_cap: this.blueTeleCap
    };
  }

  public fromJSON(json: any): VelocityVortexMatchDetails {
    const details: VelocityVortexMatchDetails = new VelocityVortexMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;
    details.redAutoBeacons = json.red_auto_beacons;
    details.redAutoCap = json.red_auto_cap;
    details.redAutoPartCen = json.red_auto_part_cen;
    details.redAutoPartCor = json.red_auto_part_cor;
    details.redAutoRobot1 = json.red_auto_robot_1;
    details.redAutoRobot2 = json.red_auto_robot_2;
    details.redTeleBeacons = json.red_tele_beacons;
    details.redTelePartCen = json.red_tele_part_cen;
    details.redTelePartCor = json.red_tele_part_cor;
    details.redTeleCap = json.red_tele_cap;
    details.blueAutoBeacons = json.blue_auto_beacons;
    details.blueAutoCap = json.blue_auto_cap;
    details.blueAutoPartCen = json.blue_auto_part_cen;
    details.blueAutoPartCor = json.blue_auto_part_cor;
    details.blueAutoRobot1 = json.blue_auto_robot_1;
    details.blueAutoRobot2 = json.blue_auto_robot_2;
    details.blueTeleBeacons = json.blue_tele_beacons;
    details.blueTelePartCen = json.blue_tele_part_cen;
    details.blueTelePartCor = json.blue_tele_part_cor;
    details.blueTeleCap = json.blue_tele_cap;
    return details;
  }

  /**
   * Getter redAutoBeacons
   * @return {number}
   */
  public get redAutoBeacons(): number {
    return this._redAutoBeacons;
  }

  /**
   * Getter redAutoCap
   * @return {boolean}
   */
  public get redAutoCap(): boolean {
    return this._redAutoCap;
  }

  /**
   * Getter redAutoPartCen
   * @return {number}
   */
  public get redAutoPartCen(): number {
    return this._redAutoPartCen;
  }

  /**
   * Getter redAutoPartCor
   * @return {number}
   */
  public get redAutoPartCor(): number {
    return this._redAutoPartCor;
  }

  /**
   * Getter redAutoRobot1
   * @return {number}
   */
  public get redAutoRobot1(): number {
    return this._redAutoRobot1;
  }

  /**
   * Getter redAutoRobot2
   * @return {number}
   */
  public get redAutoRobot2(): number {
    return this._redAutoRobot2;
  }

  /**
   * Getter redTeleBeacons
   * @return {number}
   */
  public get redTeleBeacons(): number {
    return this._redTeleBeacons;
  }

  /**
   * Getter redTelePartCen
   * @return {number}
   */
  public get redTelePartCen(): number {
    return this._redTelePartCen;
  }

  /**
   * Getter redTelePartCor
   * @return {number}
   */
  public get redTelePartCor(): number {
    return this._redTelePartCor;
  }

  /**
   * Getter redTeleCap
   * @return {number}
   */
  public get redTeleCap(): number {
    return this._redTeleCap;
  }

  /**
   * Getter blueAutoBeacons
   * @return {number}
   */
  public get blueAutoBeacons(): number {
    return this._blueAutoBeacons;
  }

  /**
   * Getter blueAutoCap
   * @return {boolean}
   */
  public get blueAutoCap(): boolean {
    return this._blueAutoCap;
  }

  /**
   * Getter blueAutoPartCen
   * @return {number}
   */
  public get blueAutoPartCen(): number {
    return this._blueAutoPartCen;
  }

  /**
   * Getter blueAutoPartCor
   * @return {number}
   */
  public get blueAutoPartCor(): number {
    return this._blueAutoPartCor;
  }

  /**
   * Getter blueAutoRobot1
   * @return {number}
   */
  public get blueAutoRobot1(): number {
    return this._blueAutoRobot1;
  }

  /**
   * Getter blueAutoRobot2
   * @return {number}
   */
  public get blueAutoRobot2(): number {
    return this._blueAutoRobot2;
  }

  /**
   * Getter blueTeleBeacons
   * @return {number}
   */
  public get blueTeleBeacons(): number {
    return this._blueTeleBeacons;
  }

  /**
   * Getter blueTelePartCen
   * @return {number}
   */
  public get blueTelePartCen(): number {
    return this._blueTelePartCen;
  }

  /**
   * Getter blueTelePartCor
   * @return {number}
   */
  public get blueTelePartCor(): number {
    return this._blueTelePartCor;
  }

  /**
   * Getter blueTeleCap
   * @return {number}
   */
  public get blueTeleCap(): number {
    return this._blueTeleCap;
  }

  /**
   * Setter redAutoBeacons
   * @param {number} value
   */
  public set redAutoBeacons(value: number) {
    this._redAutoBeacons = value;
  }

  /**
   * Setter redAutoCap
   * @param {boolean} value
   */
  public set redAutoCap(value: boolean) {
    this._redAutoCap = value;
  }

  /**
   * Setter redAutoPartCen
   * @param {number} value
   */
  public set redAutoPartCen(value: number) {
    this._redAutoPartCen = value;
  }

  /**
   * Setter redAutoPartCor
   * @param {number} value
   */
  public set redAutoPartCor(value: number) {
    this._redAutoPartCor = value;
  }

  /**
   * Setter redAutoRobot1
   * @param {number} value
   */
  public set redAutoRobot1(value: number) {
    this._redAutoRobot1 = value;
  }

  /**
   * Setter redAutoRobot2
   * @param {number} value
   */
  public set redAutoRobot2(value: number) {
    this._redAutoRobot2 = value;
  }

  /**
   * Setter redTeleBeacons
   * @param {number} value
   */
  public set redTeleBeacons(value: number) {
    this._redTeleBeacons = value;
  }

  /**
   * Setter redTelePartCen
   * @param {number} value
   */
  public set redTelePartCen(value: number) {
    this._redTelePartCen = value;
  }

  /**
   * Setter redTelePartCor
   * @param {number} value
   */
  public set redTelePartCor(value: number) {
    this._redTelePartCor = value;
  }

  /**
   * Setter redTeleCap
   * @param {number} value
   */
  public set redTeleCap(value: number) {
    this._redTeleCap = value;
  }

  /**
   * Setter blueAutoBeacons
   * @param {number} value
   */
  public set blueAutoBeacons(value: number) {
    this._blueAutoBeacons = value;
  }

  /**
   * Setter blueAutoCap
   * @param {boolean} value
   */
  public set blueAutoCap(value: boolean) {
    this._blueAutoCap = value;
  }

  /**
   * Setter blueAutoPartCen
   * @param {number} value
   */
  public set blueAutoPartCen(value: number) {
    this._blueAutoPartCen = value;
  }

  /**
   * Setter blueAutoPartCor
   * @param {number} value
   */
  public set blueAutoPartCor(value: number) {
    this._blueAutoPartCor = value;
  }

  /**
   * Setter blueAutoRobot1
   * @param {number} value
   */
  public set blueAutoRobot1(value: number) {
    this._blueAutoRobot1 = value;
  }

  /**
   * Setter blueAutoRobot2
   * @param {number} value
   */
  public set blueAutoRobot2(value: number) {
    this._blueAutoRobot2 = value;
  }

  /**
   * Setter blueTeleBeacons
   * @param {number} value
   */
  public set blueTeleBeacons(value: number) {
    this._blueTeleBeacons = value;
  }

  /**
   * Setter blueTelePartCen
   * @param {number} value
   */
  public set blueTelePartCen(value: number) {
    this._blueTelePartCen = value;
  }

  /**
   * Setter blueTelePartCor
   * @param {number} value
   */
  public set blueTelePartCor(value: number) {
    this._blueTelePartCor = value;
  }

  /**
   * Setter blueTeleCap
   * @param {number} value
   */
  public set blueTeleCap(value: number) {
    this._blueTeleCap = value;
  }

}
