import { ISerializable } from './ISerializable';
import Match from './Match';

export default class Insights implements ISerializable {
  private _highScoreMatch: Match | null;
  private _averageMatchScore: number;
  private _averageWinningScore: number;
  private _averageWinningMargin: number;
  private _averageMajorPenalties: number;
  private _averageMinorPenalties: number;

  constructor() {
    this._highScoreMatch = new Match();
    this._averageMatchScore = 0;
    this._averageWinningScore = 0;
    this._averageWinningMargin = 0;
    this._averageMajorPenalties = 0;
    this._averageMinorPenalties = 0;
  }

  toJSON(): object {
    return {
      high_score_match: this.highScoreMatch ? this.highScoreMatch.toJSON() : null,
      average_match_score: this.averageMatchScore,
      average_winning_score: this.averageWinningScore,
      average_winning_margin: this.averageWinningMargin,
      average_major_penalty: this.averageMajorPenalties,
      average_minor_penalty: this.averageMinorPenalties
    };
  }

  fromJSON(json: any): Insights {
    const insights = new Insights();
    insights.highScoreMatch = json.high_score_match ? new Match().fromJSON(json.high_score_match) : null;
    insights.averageMatchScore = json.average_match_score;
    insights.averageWinningScore = json.average_winning_score;
    insights.averageWinningMargin = json.average_winning_margin;
    insights.averageMajorPenalties = json.average_major_penalty;
    insights.averageMinorPenalties = json.average_minor_penalty;
    return insights;
  }

  get highScoreMatch(): Match | null {
    return this._highScoreMatch;
  }

  set highScoreMatch(value: Match | null) {
    this._highScoreMatch = value;
  }

  get averageMatchScore(): number {
    return this._averageMatchScore;
  }

  set averageMatchScore(value: number) {
    this._averageMatchScore = value;
  }

  get averageWinningScore(): number {
    return this._averageWinningScore;
  }

  set averageWinningScore(value: number) {
    this._averageWinningScore = value;
  }

  get averageWinningMargin(): number {
    return this._averageWinningMargin;
  }

  set averageWinningMargin(value: number) {
    this._averageWinningMargin = value;
  }

  get averageMajorPenalties(): number {
    return this._averageMajorPenalties;
  }

  set averageMajorPenalties(value: number) {
    this._averageMajorPenalties = value;
  }

  get averageMinorPenalties(): number {
    return this._averageMinorPenalties;
  }

  set averageMinorPenalties(value: number) {
    this._averageMinorPenalties = value;
  }
}
