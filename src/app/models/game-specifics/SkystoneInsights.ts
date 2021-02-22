import Insights from '../Insights';
import {ISerializable} from '../ISerializable';

export default class SkystoneInsights extends Insights implements ISerializable {
  private _autoAverageSkystonesDelivered: number;
  private _autoAverageStonesDelivered: number;
  private _autoAveragePlaced: number;
  private _autoPercentParked: number;
  private _percentFoundationMoved: number;
  private _percentFoundationRepositioned: number;
  private _teleAveragePlaced: number;
  private _teleAverageReturned: number;
  private _teleAverageDelivered: number;
  private _endAverageCapLevel: number;
  private _endAverageTowerBonus: number;
  private _endAverageCapBonus: number;
  private _endAverageLevelBonus: number;
  private _endPercentParked: number;
  private _autoPercentNaved: number;

  constructor() {
    super();
    this._autoAverageSkystonesDelivered = 0;
    this._autoAverageStonesDelivered = 0;
    this._autoAveragePlaced = 0;
    this._autoPercentParked = 0;
    this._percentFoundationMoved = 0;
    this._percentFoundationRepositioned = 0;
    this._teleAveragePlaced = 0;
    this._teleAverageReturned = 0;
    this._teleAverageDelivered = 0;
    this._endAverageCapLevel = 0;
    this._endAverageTowerBonus = 0;
    this._endAverageCapBonus = 0;
    this._endAverageLevelBonus = 0;
    this._endPercentParked = 0;
    this._autoPercentNaved = 0;
  }

  toJSON(): object {
    return {
      high_score_match: this.highScoreMatch,
      average_match_score: this.averageMatchScore,
      average_winning_score: this.averageWinningScore,
      average_winning_margin: this.averageWinningMargin,
      game: {
        auto_average_skystones_delivered: this.autoAverageSkystonesDelivered,
        auto_average_stones_delivered: this.autoAverageStonesDelivered,
        auto_average_placed: this.autoAveragePlaced,
        auto_percent_parked: this.autoPercentParked,
        percent_foundation_moved: this.percentFoundationMoved,
        percent_foundation_repositioned: this.percentFoundationRepositioned,
        tele_average_placed: this.teleAveragePlaced,
        tele_average_returned: this.teleAverageReturned,
        tele_average_delivered: this.teleAverageDelivered,
        end_average_cap_level: this.endAverageCapLevel,
        end_average_tower_bonus: this.endAverageTowerBonus,
        end_average_cap_bonus: this.endAverageCapBonus,
        end_average_level_bonus: this.endAverageLevelBonus,
        end_percent_parked: this.endPercentParked,
        auto_percent_naved: this.autoPercentNaved,
      }
    }
  }

  fromJSON(json: any): SkystoneInsights {
    const skystone: SkystoneInsights = new SkystoneInsights();
    skystone.highScoreMatch = json.high_score_match ? new Match().fromJSON(json.high_score_match) : null;
    skystone.averageMatchScore = json.average_match_score;
    skystone.averageWinningScore = json.average_winning_score;
    skystone.averageWinningMargin = json.average_winning_margin;
    skystone.autoAverageStonesDelivered = json.game.auto_average_skystones_delivered;
    skystone.autoAveragePlaced = json.game.auto_average_placed;
    skystone.autoPercentParked = json.game.auto_percent_parked;
    skystone.percentFoundationMoved = json.game.percent_foundation_moved;
    skystone.percentFoundationRepositioned = json.game.percent_foundation_repositioned;
    skystone.teleAveragePlaced = json.game.tele_average_placed;
    skystone.teleAverageReturned = json.game.tele_average_returned;
    skystone.teleAverageDelivered = json.game.tele_average_delivered;
    skystone.endAverageCapLevel = json.game.end_average_cap_level;
    skystone.endAverageTowerBonus = json.game.end_average_tower_bonus;
    skystone.endAverageCapBonus = json.game.end_average_cap_bonus;
    skystone.endAverageLevelBonus = json.game.end_average_level_bonus;
    skystone.endPercentParked = json.game.end_percent_parked;
    skystone.autoPercentNaved = json.game.auto_percent_naved;
    return skystone;
  }

  get autoAverageSkystonesDelivered(): number {
    return this._autoAverageSkystonesDelivered;
  }

  set autoAverageSkystonesDelivered(value: number) {
    this._autoAverageSkystonesDelivered = value;
  }

  get autoAverageStonesDelivered(): number {
    return this._autoAverageStonesDelivered;
  }

  set autoAverageStonesDelivered(value: number) {
    this._autoAverageStonesDelivered = value;
  }

  get autoAveragePlaced(): number {
    return this._autoAveragePlaced;
  }

  set autoAveragePlaced(value: number) {
    this._autoAveragePlaced = value;
  }

  get autoPercentParked(): number {
    return this._autoPercentParked;
  }

  set autoPercentParked(value: number) {
    this._autoPercentParked = value;
  }

  get percentFoundationMoved(): number {
    return this._percentFoundationMoved;
  }

  set percentFoundationMoved(value: number) {
    this._percentFoundationMoved = value;
  }

  get percentFoundationRepositioned(): number {
    return this._percentFoundationRepositioned;
  }

  set percentFoundationRepositioned(value: number) {
    this._percentFoundationRepositioned = value;
  }

  get teleAveragePlaced(): number {
    return this._teleAveragePlaced;
  }

  set teleAveragePlaced(value: number) {
    this._teleAveragePlaced = value;
  }

  get teleAverageReturned(): number {
    return this._teleAverageReturned;
  }

  set teleAverageReturned(value: number) {
    this._teleAverageReturned = value;
  }

  get teleAverageDelivered(): number {
    return this._teleAverageDelivered;
  }

  set teleAverageDelivered(value: number) {
    this._teleAverageDelivered = value;
  }

  get endAverageCapLevel(): number {
    return this._endAverageCapLevel;
  }

  set endAverageCapLevel(value: number) {
    this._endAverageCapLevel = value;
  }

  get endAverageTowerBonus(): number {
    return this._endAverageTowerBonus;
  }

  set endAverageTowerBonus(value: number) {
    this._endAverageTowerBonus = value;
  }

  get endAverageCapBonus(): number {
    return this._endAverageCapBonus;
  }

  set endAverageCapBonus(value: number) {
    this._endAverageCapBonus = value;
  }

  get endAverageLevelBonus(): number {
    return this._endAverageLevelBonus;
  }

  set endAverageLevelBonus(value: number) {
    this._endAverageLevelBonus = value;
  }

  get endPercentParked(): number {
    return this._endPercentParked;
  }

  set endPercentParked(value: number) {
    this._endPercentParked = value;
  }

  get autoPercentNaved(): number {
    return this._autoPercentNaved;
  }

  set autoPercentNaved(value: number) {
    this._autoPercentNaved = value;
  }
}
