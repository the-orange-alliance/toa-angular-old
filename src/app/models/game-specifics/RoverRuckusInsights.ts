import { ISerializable } from '../ISerializable';
import Insights from '../Insights';
import Match from '../Match';

export default class RoverRuckusInsights extends Insights implements ISerializable {
  private _autoPercentLanding: number;
  private _autoPercentSampling: number;
  private _autoPercentClaiming: number;
  private _autoPercentParking: number;
  private _teleAvgGolds: number;
  private _teleAvgSilvers: number;
  private _teleAvgDepotMinerals: number;
  private _endPercentLatched: number;
  private _endPercentParked: number;

  constructor() {
    super();
    this._autoPercentLanding = 0;
    this._autoPercentSampling = 0;
    this._autoPercentClaiming = 0;
    this._autoPercentParking = 0;
    this._teleAvgGolds = 0;
    this._teleAvgSilvers = 0;
    this._teleAvgDepotMinerals = 0;
    this._endPercentLatched = 0;
    this._endPercentParked = 0;
  }

  toJSON(): object {
    return {
      high_score_match: this.highScoreMatch,
      average_match_score: this.averageMatchScore,
      average_winning_score: this.averageWinningScore,
      average_winning_margin: this.averageWinningMargin,
      game: {
        auto_percent_landing: this.autoPercentLanding,
        auto_percent_sampling: this.autoPercentSampling,
        auto_percent_claiming: this.autoPercentClaiming,
        auto_percent_parking: this.autoPercentParking,
        tele_avg_golds: this.teleAvgGolds,
        tele_avg_silvers: this.teleAvgSilvers,
        tele_avg_depot_minerals: this.teleAvgDepotMinerals,
        end_percent_latched: this.endPercentLatched,
        end_percent_parked: this.endPercentParked
      }
    }
  }

  fromJSON(json: any): RoverRuckusInsights {
    const insights = new RoverRuckusInsights();
    insights.highScoreMatch = json.high_score_match ? new Match().fromJSON(json.high_score_match) : null;
    insights.averageMatchScore = json.average_match_score;
    insights.averageWinningScore = json.average_winning_score;
    insights.averageWinningMargin = json.average_winning_margin;
    insights.autoPercentLanding = json.game.auto_percent_landing;
    insights.autoPercentSampling = json.game.auto_percent_sampling;
    insights.autoPercentClaiming = json.game.auto_percent_claiming;
    insights.autoPercentParking = json.game.auto_percent_parking;
    insights.teleAvgGolds = json.game.tele_avg_golds;
    insights.teleAvgSilvers = json.game.tele_avg_silvers;
    insights.teleAvgDepotMinerals = json.game.tele_avg_depot_minerals;
    insights.endPercentLatched = json.game.end_percent_latched;
    insights.endPercentParked = json.game.end_percent_parked;
    return insights;
  }

  get autoPercentLanding(): number {
    return this._autoPercentLanding;
  }

  set autoPercentLanding(value: number) {
    this._autoPercentLanding = value;
  }

  get autoPercentSampling(): number {
    return this._autoPercentSampling;
  }

  set autoPercentSampling(value: number) {
    this._autoPercentSampling = value;
  }

  get autoPercentClaiming(): number {
    return this._autoPercentClaiming;
  }

  set autoPercentClaiming(value: number) {
    this._autoPercentClaiming = value;
  }

  get autoPercentParking(): number {
    return this._autoPercentParking;
  }

  set autoPercentParking(value: number) {
    this._autoPercentParking = value;
  }

  get teleAvgGolds(): number {
    return this._teleAvgGolds;
  }

  set teleAvgGolds(value: number) {
    this._teleAvgGolds = value;
  }

  get teleAvgSilvers(): number {
    return this._teleAvgSilvers;
  }

  set teleAvgSilvers(value: number) {
    this._teleAvgSilvers = value;
  }

  get teleAvgDepotMinerals(): number {
    return this._teleAvgDepotMinerals;
  }

  set teleAvgDepotMinerals(value: number) {
    this._teleAvgDepotMinerals = value;
  }

  get endPercentLatched(): number {
    return this._endPercentLatched;
  }

  set endPercentLatched(value: number) {
    this._endPercentLatched = value;
  }

  get endPercentParked(): number {
    return this._endPercentParked;
  }

  set endPercentParked(value: number) {
    this._endPercentParked = value;
  }
}
