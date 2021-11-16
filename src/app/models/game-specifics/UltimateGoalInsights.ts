import Insights from '../Insights';
import Match from '../Match';
import {ISerializable} from '../ISerializable';

export default class UltimateGoalInsights extends Insights implements ISerializable {
  private _autoAverageRingsScoredHigh: number;
  private _autoAverageRingsScoredMid: number;
  private _autoAverageRingsScoredLow: number;
  private _autoAveragePowerShots: number;
  private _autoPercentWobblesDelivered: number;
  private _autoPercentNavigated: number;
  private _teleAverageRingsScoredHigh: number;
  private _teleAverageRingsScoredMid: number;
  private _teleAverageRingsScoredLow: number;
  private _endAverageRingsOnWobble: number;
  private _endPercentWobblesOnStart: number;
  private _endPercentWobblesInDropZone: number;
  private _endAveragePowerShots: number;

  constructor() {
    super();
    this._autoAverageRingsScoredHigh = 0;
    this._autoAverageRingsScoredMid = 0;
    this._autoAverageRingsScoredLow = 0;
    this._autoAveragePowerShots = 0;
    this._autoPercentWobblesDelivered = 0;
    this._autoPercentNavigated = 0;
    this._teleAverageRingsScoredHigh = 0;
    this._teleAverageRingsScoredMid = 0;
    this._teleAverageRingsScoredLow = 0;
    this._endAverageRingsOnWobble = 0;
    this._endPercentWobblesOnStart = 0;
    this._endPercentWobblesInDropZone = 0;
    this._endAveragePowerShots = 0;
  }

  toJSON(): object {
    return {
      high_score_match: this.highScoreMatch,
      average_match_score: this.averageMatchScore,
      average_winning_score: this.averageWinningScore,
      average_winning_margin: this.averageWinningMargin,
      game: {
        auto_average_rings_scored_high: this.autoAverageRingsScoredHigh,
        auto_average_rings_scored_mid: this.autoAverageRingsScoredMid,
        auto_average_rings_scored_low: this.autoAverageRingsScoredLow,
        auto_average_power_shots: this.autoAveragePowerShots,
        auto_percent_wobbles_delivered: this.autoPercentWobblesDelivered,
        auto_percent_navigated: this.autoPercentNavigated,
        tele_average_rings_scored_high: this.teleAverageRingsScoredHigh,
        tele_average_rings_scored_mid: this.teleAverageRingsScoredMid,
        tele_average_rings_scored_low: this.teleAverageRingsScoredLow,
        end_average_rings_on_wobble: this.endAverageRingsOnWobble,
        end_percent_wobbles_on_start: this.endPercentWobblesOnStart,
        end_percent_wobbles_in_drop_zone: this.endPercentWobblesInDropZone,
        end_average_power_shots: this.endAveragePowerShots
      }
    }
  }

  fromJSON(json: any): UltimateGoalInsights {
    const insights = new UltimateGoalInsights();
    insights.highScoreMatch = json.high_score_match ? new Match().fromJSON(json.high_score_match) : null;
    insights.averageMatchScore = json.average_match_score;
    insights.averageWinningScore = json.average_winning_score;
    insights.averageWinningMargin = json.average_winning_margin;
    insights.averageMajorPenalties = json.average_major_penalty;
    insights.averageMinorPenalties = json.average_minor_penalty;

    insights.autoAverageRingsScoredHigh = json.game.auto_average_rings_scored_high;
    insights.autoAverageRingsScoredMid = json.game.auto_average_rings_scored_mid;
    insights.autoAverageRingsScoredLow = json.game.auto_average_rings_scored_low;
    insights.autoAveragePowerShots = json.game.auto_average_power_shots;
    insights.autoPercentWobblesDelivered = json.game.auto_percent_wobbles_delivered;
    insights.autoPercentNavigated = json.game.auto_percent_navigated;
    insights.teleAverageRingsScoredHigh = json.game.tele_average_rings_scored_high;
    insights.teleAverageRingsScoredMid = json.game.tele_average_rings_scored_mid;
    insights.teleAverageRingsScoredLow = json.game.tele_average_rings_scored_low;
    insights.endAverageRingsOnWobble = json.game.end_average_rings_on_wobble;
    insights.endPercentWobblesOnStart = json.game.end_percent_wobbles_on_start;
    insights.endPercentWobblesInDropZone = json.game.end_percent_wobbles_in_drop_zone;
    insights.endAveragePowerShots = json.game.end_average_power_shots;
    return insights;
  }

  get autoAverageRingsScoredHigh(): number {
    return this._autoAverageRingsScoredHigh;
  }

  set autoAverageRingsScoredHigh(value: number) {
    this._autoAverageRingsScoredHigh = value;
  }

  get autoAverageRingsScoredMid(): number {
    return this._autoAverageRingsScoredMid;
  }

  set autoAverageRingsScoredMid(value: number) {
    this._autoAverageRingsScoredMid = value;
  }

  get autoAverageRingsScoredLow(): number {
    return this._autoAverageRingsScoredLow;
  }

  set autoAverageRingsScoredLow(value: number) {
    this._autoAverageRingsScoredLow = value;
  }

  get autoAveragePowerShots(): number {
    return this._autoAveragePowerShots;
  }

  set autoAveragePowerShots(value: number) {
    this._autoAveragePowerShots = value;
  }

  get autoPercentWobblesDelivered(): number {
    return this._autoPercentWobblesDelivered;
  }

  set autoPercentWobblesDelivered(value: number) {
    this._autoPercentWobblesDelivered = value;
  }

  get autoPercentNavigated(): number {
    return this._autoPercentNavigated;
  }

  set autoPercentNavigated(value: number) {
    this._autoPercentNavigated = value;
  }

  get teleAverageRingsScoredHigh(): number {
    return this._teleAverageRingsScoredHigh;
  }

  set teleAverageRingsScoredHigh(value: number) {
    this._teleAverageRingsScoredHigh = value;
  }

  get teleAverageRingsScoredMid(): number {
    return this._teleAverageRingsScoredMid;
  }

  set teleAverageRingsScoredMid(value: number) {
    this._teleAverageRingsScoredMid = value;
  }

  get teleAverageRingsScoredLow(): number {
    return this._teleAverageRingsScoredLow;
  }

  set teleAverageRingsScoredLow(value: number) {
    this._teleAverageRingsScoredLow = value;
  }

  get endAverageRingsOnWobble(): number {
    return this._endAverageRingsOnWobble;
  }

  set endAverageRingsOnWobble(value: number) {
    this._endAverageRingsOnWobble = value;
  }

  get endPercentWobblesOnStart(): number {
    return this._endPercentWobblesOnStart;
  }

  set endPercentWobblesOnStart(value: number) {
    this._endPercentWobblesOnStart = value;
  }

  get endPercentWobblesInDropZone(): number {
    return this._endPercentWobblesInDropZone;
  }

  set endPercentWobblesInDropZone(value: number) {
    this._endPercentWobblesInDropZone = value;
  }

  get endAveragePowerShots(): number {
    return this._endAveragePowerShots;
  }

  set endAveragePowerShots(value: number) {
    this._endAveragePowerShots = value;
  }
}
