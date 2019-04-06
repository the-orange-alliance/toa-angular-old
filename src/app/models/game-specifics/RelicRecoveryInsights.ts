import Insights from '../Insights';

export default class RelicRecoveryInsights extends Insights implements ISerializable {
  private _autoAverageGlyphs: number;
  private _teleAverageGlyphs: number;
  private _teleAverageCiphers: number;
  private _endAverageRelic1: number;
  private _endAverageRelic2: number;
  private _endAverageRelic3: number;
  private _endPercentReliceStanding: number;
  private _endAverageBalanced: number;

  constructor() {
    super();
    this._autoAverageGlyphs = 0;
    this._teleAverageGlyphs = 0;
    this._teleAverageCiphers = 0;
    this._endAverageRelic1 = 0;
    this._endAverageRelic2 = 0;
    this._endAverageRelic3 = 0;
    this._endPercentReliceStanding = 0;
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
        end_average_relic3: this.endAverageRelic2,
        end_percent_relics_standing: this.endPercentReliceStanding,
        end_average_balanced: this.endAverageBalanced
      }
    }
  }

  fromJSON(json: any): RelicRecoveryInsights {
    return new RelicRecoveryInsights();
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

  get endPercentReliceStanding(): number {
    return this._endPercentReliceStanding;
  }

  set endPercentReliceStanding(value: number) {
    this._endPercentReliceStanding = value;
  }

  get endAverageBalanced(): number {
    return this._endAverageBalanced;
  }

  set endAverageBalanced(value: number) {
    this._endAverageBalanced = value;
  }
}
