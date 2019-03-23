import Match from './Match';

export default class EventInsights implements ISerializable {
  private _qualHighScoreMatch: Match|null;
  private _qualAverageMatchScore: number;
  private _qualAverageWinningScore: number;
  private _qualAverageWinningMargin: number;

  private _elimHighScoreMatch: Match|null;
  private _elimAverageMatchScore: number;
  private _elimAverageWinningScore: number;
  private _elimAverageWinningMargin: number;

  constructor() {
    this._qualHighScoreMatch = null;
    this._qualAverageMatchScore = 0;
    this._qualAverageWinningScore = 0;
    this._qualAverageWinningMargin = 0;

    this._elimHighScoreMatch = null;
    this._elimAverageMatchScore = 0;
    this._elimAverageWinningScore = 0;
    this._elimAverageWinningMargin = 0;
  }

  toJSON(): object {
    return {
      qual_high_score_match: this.qualHighScoreMatch ? this.qualHighScoreMatch.toJSON() : null,
      qual_average_match_score: this.qualAverageMatchScore,
      qual_average_winning_score: this.qualAverageWinningScore,
      qual_average_winning_margin: this.qualAverageWinningMargin,

      elim_high_score_match: this.qualHighScoreMatch ? this.qualHighScoreMatch.toJSON() : null,
      elim_average_match_score: this.qualAverageMatchScore,
      elim_average_winning_score: this.qualAverageWinningScore,
      elim_average_winning_margin: this.qualAverageWinningMargin
    };
  }

  fromJSON(json: any): EventInsights {
    const insights: EventInsights = new EventInsights();
    insights.qualHighScoreMatch = json.qual_high_score_match ? new Match().fromJSON(json.qual_high_score_match) : null;
    insights.qualAverageMatchScore = json.qual_average_match_score;
    insights.qualAverageWinningScore = json.qual_average_winning_score;
    insights.qualAverageWinningMargin = json.qual_average_winning_margin;

    insights.elimHighScoreMatch = json.elim_high_score_match ? new Match().fromJSON(json.elim_high_score_match) : null;
    insights.elimAverageMatchScore = json.elim_average_match_score;
    insights.elimAverageWinningScore = json.elim_average_winning_score;
    insights.elimAverageWinningMargin = json.elim_average_winning_margin;
    return insights;
  }

  get qualHighScoreMatch(): Match|null {
    return this._qualHighScoreMatch;
  }

  set qualHighScoreMatch(value: Match|null) {
    this._qualHighScoreMatch = value;
  }

  get qualAverageMatchScore(): number {
    return this._qualAverageMatchScore;
  }

  set qualAverageMatchScore(value: number) {
    this._qualAverageMatchScore = value;
  }

  get qualAverageWinningScore(): number {
    return this._qualAverageWinningScore;
  }

  set qualAverageWinningScore(value: number) {
    this._qualAverageWinningScore = value;
  }

  get qualAverageWinningMargin(): number {
    return this._qualAverageWinningMargin;
  }

  set qualAverageWinningMargin(value: number) {
    this._qualAverageWinningMargin = value;
  }

  get elimHighScoreMatch(): Match|null {
    return this._elimHighScoreMatch;
  }

  set elimHighScoreMatch(value: Match|null) {
    this._elimHighScoreMatch = value;
  }

  get elimAverageMatchScore(): number {
    return this._elimAverageMatchScore;
  }

  set elimAverageMatchScore(value: number) {
    this._elimAverageMatchScore = value;
  }

  get elimAverageWinningScore(): number {
    return this._elimAverageWinningScore;
  }

  set elimAverageWinningScore(value: number) {
    this._elimAverageWinningScore = value;
  }

  get elimAverageWinningMargin(): number {
    return this._elimAverageWinningMargin;
  }

  set elimAverageWinningMargin(value: number) {
    this._elimAverageWinningMargin = value;
  }
}
