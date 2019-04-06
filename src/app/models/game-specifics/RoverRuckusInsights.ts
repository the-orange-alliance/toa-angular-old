import Insights from '../Insights';

export default class RoverRuckusInsights extends Insights implements ISerializable {
  private _autoAverageLanding: number;
  private _autoAverageSampling: number;
  private _autoAverageClaiming: number;
  private _autoAverageParking: number;
  private _teleAverageGolds: number;
  private _teleAverageSilvers: number;
  private _teleAverageDepotMinerals: number;
  private _endAverageLatched: number;
  private _endAverageParked: number;

  constructor() {
    super();
    this._autoAverageLanding = 0;
    this._autoAverageSampling = 0;
    this._autoAverageClaiming = 0;
    this._autoAverageParking = 0;
    this._teleAverageGolds = 0;
    this._teleAverageSilvers = 0;
    this._teleAverageDepotMinerals = 0;
    this._endAverageLatched = 0;
    this._endAverageParked = 0;
  }

  toJSON(): object {
    return {
      high_score_match: this.highScoreMatch,
      average_match_score: this.averageMatchScore,
      average_winning_score: this.averageWinningScore,
      average_winning_margin: this.averageWinningMargin,
      game: {
        auto_average_landing: this.autoAverageLanding,
        auto_average_sampling: this.autoAverageSampling,
        auto_average_claiming: this.autoAverageClaiming,
        auto_average_parking: this.autoAverageParking,
        tele_average_golds: this.teleAverageGolds,
        tele_average_silvers: this.teleAverageSilvers,
        tele_average_depot_minerals: this.teleAverageDepotMinerals,
        end_average_latched: this.endAverageLatched,
        end_average_parked: this.endAverageParked
      }
    }
  }

  fromJSON(json: any): RoverRuckusInsights {
    return new RoverRuckusInsights();
  }


  get autoAverageLanding(): number {
    return this._autoAverageLanding;
  }

  set autoAverageLanding(value: number) {
    this._autoAverageLanding = value;
  }

  get autoAverageSampling(): number {
    return this._autoAverageSampling;
  }

  set autoAverageSampling(value: number) {
    this._autoAverageSampling = value;
  }

  get autoAverageClaiming(): number {
    return this._autoAverageClaiming;
  }

  set autoAverageClaiming(value: number) {
    this._autoAverageClaiming = value;
  }

  get autoAverageParking(): number {
    return this._autoAverageParking;
  }

  set autoAverageParking(value: number) {
    this._autoAverageParking = value;
  }

  get teleAverageGolds(): number {
    return this._teleAverageGolds;
  }

  set teleAverageGolds(value: number) {
    this._teleAverageGolds = value;
  }

  get teleAverageSilvers(): number {
    return this._teleAverageSilvers;
  }

  set teleAverageSilvers(value: number) {
    this._teleAverageSilvers = value;
  }

  get teleAverageDepotMinerals(): number {
    return this._teleAverageDepotMinerals;
  }

  set teleAverageDepotMinerals(value: number) {
    this._teleAverageDepotMinerals = value;
  }

  get endAverageLatched(): number {
    return this._endAverageLatched;
  }

  set endAverageLatched(value: number) {
    this._endAverageLatched = value;
  }

  get endAverageParked(): number {
    return this._endAverageParked;
  }

  set endAverageParked(value: number) {
    this._endAverageParked = value;
  }
}
