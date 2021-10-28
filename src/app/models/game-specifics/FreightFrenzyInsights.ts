import Insights from '../Insights';
import Match from '../Match';
import {ISerializable} from '../ISerializable';

export default class FreightFrenzyInsights extends Insights implements ISerializable {
  private _autoAveragePartialStorage: number;
  private _autoAverageCompleteStorage: number;
  private _autoAveragePartialWarehouse: number;
  private _autoAverageCompleteWarehouse: number;
  private _autoAverageBonus: number;
  private _autoAverageStorageFreight: number;
  private _autoAverageFreight1: number;
  private _autoAverageFreight2: number;
  private _autoAverageFreight3: number;
  private _teleAverageFreight1: number;
  private _teleAverageFreight2: number;
  private _teleAverageFreight3: number;
  private _teleAverageSharedFreight: number;
  private _endAverageDelivered: number;
  private _endAverageHubBalanced: number;
  private _endAverageSharedHubUnbalanced: number;
  private _endParkedPartialWarehouse: number;
  private _endParkedCompleteWarehouse: number;
  private _averageCapped: number;
  private _averageCarousel: number;

  constructor() {
    super();
    this._autoAveragePartialStorage = 0;
    this._autoAverageCompleteStorage = 0;
    this._autoAverageBonus = 0;
    this._autoAverageStorageFreight = 0;
    this._autoAverageFreight1 = 0;
    this._autoAverageFreight2 = 0;
    this._autoAverageFreight3 = 0;
    this._teleAverageFreight1 = 0;
    this._teleAverageFreight2 = 0;
    this._teleAverageFreight3 = 0;
    this._teleAverageSharedFreight = 0;
    this._endAverageDelivered = 0;
    this._endAverageHubBalanced = 0;
    this._endAverageSharedHubUnbalanced = 0;
    this._autoAveragePartialWarehouse = 0;
    this._autoAverageCompleteWarehouse = 0;
    this._endParkedPartialWarehouse = 0;
    this._endParkedCompleteWarehouse = 0;
    this._averageCapped = 0;
    this._averageCarousel = 0;
  }

  toJSON(): object {
    return {
      high_score_match: this.highScoreMatch,
      average_match_score: this.averageMatchScore,
      average_winning_score: this.averageWinningScore,
      average_winning_margin: this.averageWinningMargin,
      game: {
        auto_percent_partially_in_storage: this.autoAveragePartialStorage,
        auto_percent_complete_in_storage: this.autoAverageCompleteStorage,
        auto_percent_partially_in_warehouse: this.autoAveragePartialWarehouse,
        auto_percent_completely_in_warehouse: this.autoAverageCompleteWarehouse,
        auto_percent_bonuses_earned: this.autoAverageBonus,
        auto_average_storage_freight: this.autoAverageStorageFreight,
        auto_average_freight_1: this.autoAverageFreight1,
        auto_average_freight_2: this.autoAverageFreight2,
        auto_average_freight_3: this.autoAverageFreight3,
        tele_average_freight_1: this.teleAverageFreight1,
        tele_average_freight_2: this.teleAverageFreight2,
        tele_average_freight_3: this.teleAverageFreight3,
        tele_average_shared_freight: this.teleAverageSharedFreight,
        end_average_delivered: this.endAverageDelivered,
        end_percent_hub_balanced: this.endAverageHubBalanced,
        end_percent_shared_hub_unbalanced: this.endAverageSharedHubUnbalanced,
        end_percent_partially_in_warehouse: this.endParkedPartialWarehouse,
        end_percent_completely_in_warehouse: this.autoAverageCompleteWarehouse,
        percent_capped: this.averageCapped,
        percent_carousel: this.averageCarousel
      }
    }
  }

  fromJSON(json: any): FreightFrenzyInsights {
    const insights = new FreightFrenzyInsights();
    insights.highScoreMatch = json.high_score_match ? new Match().fromJSON(json.high_score_match) : null;
    insights.averageMatchScore = json.average_match_score;
    insights.averageWinningScore = json.average_winning_score;
    insights.averageWinningMargin = json.average_winning_margin;

    insights.autoAveragePartialStorage = json.game.auto_percent_partially_in_storage;
    insights.autoAverageCompleteStorage = json.game.auto_percent_complete_in_storage;
    insights.autoAveragePartialWarehouse = json.game.auto_percent_partially_in_warehouse;
    insights.autoAverageCompleteWarehouse = json.game.auto_percent_completely_in_warehouse;
    insights.autoAverageBonus = json.game.auto_percent_bonuses_earned;
    insights.autoAverageStorageFreight = json.game.auto_average_storage_freight;
    insights.autoAverageFreight1 = json.game.auto_average_freight_1;
    insights.autoAverageFreight2 = json.game.auto_average_freight_2;
    insights.autoAverageFreight3 = json.game.auto_average_freight_3;
    insights.teleAverageFreight1 = json.game.tele_average_freight_1;
    insights.teleAverageFreight2 = json.game.tele_average_freight_2;
    insights.teleAverageFreight3 = json.game.tele_average_freight_3;
    insights.teleAverageSharedFreight = json.game.tele_average_shared_freight;
    insights.endAverageDelivered = json.game.end_average_delivered;
    insights.endAverageHubBalanced = json.game.end_percent_hub_balanced;
    insights.endAverageSharedHubUnbalanced = json.game.end_percent_shared_hub_unbalanced;
    insights.endParkedPartialWarehouse = json.game.end_percent_partially_in_warehouse;
    insights.autoAverageCompleteWarehouse = json.game.end_percent_completely_in_warehouse;
    insights.averageCapped = json.game.percent_capped;
    insights.averageCarousel = json.game.percent_carousel;
    console.log(insights)
    return insights;
  }

  get autoAveragePartialStorage(): number {
    return this._autoAveragePartialStorage;
  }

  set autoAveragePartialStorage(value: number) {
    this._autoAveragePartialStorage = value;
  }

  get autoAverageCompleteStorage(): number {
    return this._autoAverageCompleteStorage;
  }

  set autoAverageCompleteStorage(value: number) {
    this._autoAverageCompleteStorage = value;
  }

  get autoAveragePartialWarehouse(): number {
    return this._autoAveragePartialWarehouse;
  }

  set autoAveragePartialWarehouse(value: number) {
    this._autoAveragePartialWarehouse = value;
  }

  get autoAverageCompleteWarehouse(): number {
    return this._autoAverageCompleteWarehouse;
  }

  set autoAverageCompleteWarehouse(value: number) {
    this._autoAverageCompleteWarehouse = value;
  }

  get autoAverageBonus(): number {
    return this._autoAverageBonus;
  }

  set autoAverageBonus(value: number) {
    this._autoAverageBonus = value;
  }

  get autoAverageStorageFreight(): number {
    return this._autoAverageStorageFreight;
  }

  set autoAverageStorageFreight(value: number) {
    this._autoAverageStorageFreight = value;
  }

  get autoAverageFreight1(): number {
    return this._autoAverageFreight1;
  }

  set autoAverageFreight1(value: number) {
    this._autoAverageFreight1 = value;
  }

  get autoAverageFreight2(): number {
    return this._autoAverageFreight2;
  }

  set autoAverageFreight2(value: number) {
    this._autoAverageFreight2 = value;
  }

  get autoAverageFreight3(): number {
    return this._autoAverageFreight3;
  }

  set autoAverageFreight3(value: number) {
    this._autoAverageFreight3 = value;
  }

  get teleAverageFreight1(): number {
    return this._teleAverageFreight1;
  }

  set teleAverageFreight1(value: number) {
    this._teleAverageFreight1 = value;
  }

  get teleAverageFreight2(): number {
    return this._teleAverageFreight2;
  }

  set teleAverageFreight2(value: number) {
    this._teleAverageFreight2 = value;
  }

  get teleAverageFreight3(): number {
    return this._teleAverageFreight3;
  }

  set teleAverageFreight3(value: number) {
    this._teleAverageFreight3 = value;
  }

  get teleAverageSharedFreight(): number {
    return this._teleAverageSharedFreight;
  }

  set teleAverageSharedFreight(value: number) {
    this._teleAverageSharedFreight = value;
  }

  get endAverageDelivered(): number {
    return this._endAverageDelivered;
  }

  set endAverageDelivered(value: number) {
    this._endAverageDelivered = value;
  }

  get endAverageHubBalanced(): number {
    return this._endAverageHubBalanced;
  }

  set endAverageHubBalanced(value: number) {
    this._endAverageHubBalanced = value;
  }

  get endAverageSharedHubUnbalanced(): number {
    return this._endAverageSharedHubUnbalanced;
  }

  set endAverageSharedHubUnbalanced(value: number) {
    this._endAverageSharedHubUnbalanced = value;
  }

  get endParkedPartialWarehouse(): number {
    return this._endParkedPartialWarehouse;
  }

  set endParkedPartialWarehouse(value: number) {
    this._endParkedPartialWarehouse = value;
  }

  get endParkedCompleteWarehouse(): number {
    return this._endParkedCompleteWarehouse;
  }

  set endParkedCompleteWarehouse(value: number) {
    this._endParkedCompleteWarehouse = value;
  }

  get averageCapped(): number {
    return this._averageCapped;
  }

  set averageCapped(value: number) {
    this._averageCapped = value;
  }

  get averageCarousel(): number {
    return this._averageCarousel;
  }

  set averageCarousel(value: number) {
    this._averageCarousel = value;
  }
}
