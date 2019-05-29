import { ISerializable } from '../ISerializable';
import Insights from '../Insights';
import Match from '../Match';

export default class RelicRecoveryInsights extends Insights implements ISerializable {
  private _autoAverageGlyphs: number;
  private _teleAverageGlyphs: number;
  private _teleAverageCiphers: number;
  private _endAverageRelic1: number;
  private _endAverageRelic2: number;
  private _endAverageRelic3: number;
  private _endPercentRelicStanding: number;
  private _endAverageBalanced: number;

  constructor() {
    super();
    this._autoAverageGlyphs = 0;
    this._teleAverageGlyphs = 0;
    this._teleAverageCiphers = 0;
    this._endAverageRelic1 = 0;
    this._endAverageRelic2 = 0;
    this._endAverageRelic3 = 0;
    this._endPercentRelicStanding = 0;
    this._endAverageBalanced = 0;
  }

  toJSON(): object {
    return {
      high_score_match: this.highScoreMatch,
      average_match_score: this.averageMatchScore,
      average_winning_score: this.averageWinningScore,
      average_winning_margin: this.averageWinningMargin,
      game: {
        auto_average_glyphs: this.autoAverageGlyphs,
        tele_average_glyphs: this.teleAverageGlyphs,
        tele_average_ciphers: this.teleAverageCiphers,
        end_average_relic1: this.endAverageRelic1,
        end_average_relic2: this.endAverageRelic2,
        end_average_relic3: this.endAverageRelic3,
        end_percent_relics_standing: this.endPercentRelicStanding,
        end_average_balanced: this.endAverageBalanced
      }
    }
  }

  fromJSON(json: any): RelicRecoveryInsights {
    const insights = new RelicRecoveryInsights();
    insights.highScoreMatch = json.high_score_match ? new Match().fromJSON(json.high_score_match) : null;
    insights.averageMatchScore = json.average_match_score;
    insights.averageWinningScore = json.average_winning_score;
    insights.averageWinningMargin = json.average_winning_margin;
    insights.autoAverageGlyphs = json.game.auto_average_glyphs;
    insights.teleAverageGlyphs = json.game.tele_average_glyphs;
    insights.teleAverageCiphers = json.game.tele_average_ciphers;
    insights.endAverageRelic1 = json.game.end_average_relic1;
    insights.endAverageRelic2 = json.game.end_average_relic2;
    insights.endAverageRelic3 = json.game.end_average_relic3;
    insights.endPercentRelicStanding = json.game.end_percent_relics_standing;
    insights.endAverageBalanced = json.game.end_average_balanced;
    return insights;
  }

  get autoAverageGlyphs(): number {
    return this._autoAverageGlyphs;
  }

  set autoAverageGlyphs(value: number) {
    this._autoAverageGlyphs = value;
  }

  get teleAverageGlyphs(): number {
    return this._teleAverageGlyphs;
  }

  set teleAverageGlyphs(value: number) {
    this._teleAverageGlyphs = value;
  }

  get teleAverageCiphers(): number {
    return this._teleAverageCiphers;
  }

  set teleAverageCiphers(value: number) {
    this._teleAverageCiphers = value;
  }

  get endAverageRelic1(): number {
    return this._endAverageRelic1;
  }

  set endAverageRelic1(value: number) {
    this._endAverageRelic1 = value;
  }

  get endAverageRelic2(): number {
    return this._endAverageRelic2;
  }

  set endAverageRelic2(value: number) {
    this._endAverageRelic2 = value;
  }

  get endAverageRelic3(): number {
    return this._endAverageRelic3;
  }

  set endAverageRelic3(value: number) {
    this._endAverageRelic3 = value;
  }

  get endPercentRelicStanding(): number {
    return this._endPercentRelicStanding;
  }

  set endPercentRelicStanding(value: number) {
    this._endPercentRelicStanding = value;
  }

  get endAverageBalanced(): number {
    return this._endAverageBalanced;
  }

  set endAverageBalanced(value: number) {
    this._endAverageBalanced = value;
  }
}
