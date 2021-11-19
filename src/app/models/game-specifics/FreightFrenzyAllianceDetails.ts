import {ISerializable} from '../ISerializable';

export default class FreightFrenzyAllianceDetails implements ISerializable {
  private _barcode1: string;
  private _barcode2: string;
  private _carousel: boolean;
  private _autoNavigated1: string;
  private _autoNavigated2: string;
  private _autoNavPoints: number;
  private _autoBonus1: boolean;
  private _autoBonus2: boolean;
  private _autoBonusPoints: number;
  private _autoStorageFreight: number;
  private _autoFreight1: number;
  private _autoFreight2: number;
  private _autoFreight3: number;
  private _autoFreightPoints: number;
  private _teleStorageFreight: number;
  private _teleFreight1: number;
  private _teleFreight2: number;
  private _teleFreight3: number;
  private _teleAllianceHubPoints: number;
  private _teleSharedHubPoints: number;
  private _teleStoragePoints: number;
  private _sharedFreight: number;
  private _endDelivered: number;
  private _endDeliveredPoints: number;
  private _allianceBalanced: boolean;
  private _allianceBalancedPoints: number;
  private _sharedUnbalanced: boolean;
  private _sharedUnbalancedPoints: number;
  private _endParked1: string;
  private _endParked2: string;
  private _endParkedPoints: number;
  private _capped: number;
  private _cappedPoints: number;
  private _carouselPoints: number;
  private _totalPoints: number;

  constructor() {
    this._barcode1 = '';
    this._barcode2 = '';
    this._carousel = false;
    this._autoNavigated1 = '';
    this._autoNavigated2 = '';
    this._autoNavPoints = -1;
    this._autoBonus1 = false;
    this._autoBonus2 = false;
    this._autoBonusPoints = -1;
    this._autoStorageFreight = -1;
    this._autoFreight1 = -1;
    this._autoFreight2 = -1;
    this._autoFreight3 = -1;
    this._autoFreightPoints = -1;
    this._teleStorageFreight = -1;
    this._teleFreight1 = -1;
    this._teleFreight2 = -1;
    this._teleFreight3 = -1;
    this._teleAllianceHubPoints = -1;
    this._teleSharedHubPoints = -1;
    this._teleStoragePoints = -1;
    this._sharedFreight = -1;
    this._endDelivered = -1;
    this._endDeliveredPoints = -1;
    this._allianceBalanced = false;
    this._allianceBalancedPoints = -1;
    this._sharedUnbalanced = false;
    this._sharedUnbalancedPoints = -1;
    this._endParked1 = '';
    this._endParked2 = '';
    this._endParkedPoints = -1;
    this._capped = -1;
    this._cappedPoints = -1;
    this._carouselPoints = -1;
    this._totalPoints = -1;
  }

  toJSON(): object {
    return {
      barcode_element_1: this.barcode1,
      barcode_element_2: this.barcode2,
      carousel: this.carousel,
      auto_navigated_1: this.autoNavigated1,
      auto_navigated_2: this.autoNavigated2,
      auto_nav_points: this.autoNavPoints,
      auto_bonus_1: this.autoBonus1,
      auto_bonus_2: this.autoBonus2,
      auto_bonus_points: this.autoBonusPoints,
      auto_storage_freight: this.autoStorageFreight,
      auto_freight_1: this.autoFreight1,
      auto_freight_2: this.autoFreight2,
      auto_freight_3: this.autoFreight3,
      auto_freight_points: this.autoFreightPoints,
      tele_storage_freight: this.teleStorageFreight,
      tele_freight_1: this.teleFreight1,
      tele_freight_2: this.teleFreight2,
      tele_freight_3: this.teleFreight3,
      tele_alliance_hub_points: this.teleAllianceHubPoints,
      tele_shared_hub_points: this.teleSharedHubPoints,
      tele_storage_points: this.teleStoragePoints,
      shared_freight: this.sharedFreight,
      end_delivered: this.endDelivered,
      end_delivered_points: this.endDeliveredPoints,
      alliance_balanced: this.allianceBalanced,
      alliance_balanced_points: this.allianceBalancedPoints,
      shared_unbalanced: this.sharedUnbalanced,
      shared_unbalanced_points: this.sharedUnbalancedPoints,
      end_parked_1: this.endParked1,
      end_parked_2: this.endParked2,
      end_parked_points: this.endParkedPoints,
      capped: this.capped,
      capped_points: this.cappedPoints,
      carousel_points: this.carouselPoints,
      total_points: this.totalPoints,
    };
  }

  fromJSON(json: any): FreightFrenzyAllianceDetails {
    const alliance: FreightFrenzyAllianceDetails  = new FreightFrenzyAllianceDetails();
    alliance.barcode1 = json.barcode_element_1;
    alliance.barcode2 = json.barcode_element_2;
    alliance.carousel = json.carousel;
    alliance.autoNavigated1 = json.auto_navigated_1;
    alliance.autoNavigated2 = json.auto_navigated_2;
    alliance.autoNavPoints = json.auto_nav_points;
    alliance.autoBonus1 = json.auto_bonus_1;
    alliance.autoBonus2 = json.auto_bonus_2;
    alliance.autoBonusPoints = json.auto_bonus_points;
    alliance.autoStorageFreight = json.auto_storage_freight;
    alliance.autoFreight1 = json.auto_freight_1;
    alliance.autoFreight2 = json.auto_freight_2;
    alliance.autoFreight3 = json.auto_freight_3;
    alliance.autoFreightPoints = json.auto_freight_points;
    alliance.teleStorageFreight = json.tele_storage_freight;
    alliance.teleFreight1 = json.tele_freight_1;
    alliance.teleFreight2 = json.tele_freight_2;
    alliance.teleFreight3 = json.tele_freight_3;
    alliance.teleAllianceHubPoints = json.tele_alliance_hub_points;
    alliance.teleSharedHubPoints = json.tele_shared_hub_points;
    alliance.teleStoragePoints = json.tele_storage_points;
    alliance.sharedFreight = json.shared_freight;
    alliance.endDelivered = json.end_delivered;
    alliance.endDeliveredPoints = json.end_delivered_points;
    alliance.allianceBalanced = json.alliance_balanced;
    alliance.allianceBalancedPoints = json.alliance_balanced_points;
    alliance.sharedUnbalanced = json.shared_unbalanced;
    alliance.sharedUnbalancedPoints = json.shared_unbalanced_points;
    alliance.endParked1 = json.end_parked_1;
    alliance.endParked2 = json.end_parked_2;
    alliance.endParkedPoints = json.end_parked_points;
    alliance.capped = json.capped;
    alliance.cappedPoints = json.capped_points;
    alliance.carouselPoints = json.carousel_points;
    alliance.totalPoints = json.total_points;
    return alliance;
  }

  get barcode1(): string {
    return this._barcode1;
  }

  set barcode1(value: string) {
    this._barcode1 = value;
  }

  get barcode2(): string {
    return this._barcode2;
  }

  set barcode2(value: string) {
    this._barcode2 = value;
  }

  get carousel(): boolean {
    return this._carousel;
  }

  set carousel(value: boolean) {
    this._carousel = value;
  }

  get autoNavigated1(): string {
    return this._autoNavigated1;
  }

  set autoNavigated1(value: string) {
    this._autoNavigated1 = value;
  }

  get autoNavigated2(): string {
    return this._autoNavigated2;
  }

  set autoNavigated2(value: string) {
    this._autoNavigated2 = value;
  }

  get autoNavPoints(): number {
    return this._autoNavPoints;
  }

  set autoNavPoints(value: number) {
    this._autoNavPoints = value;
  }

  get autoBonus1(): boolean {
    return this._autoBonus1;
  }

  set autoBonus1(value: boolean) {
    this._autoBonus1 = value;
  }

  get autoBonus2(): boolean {
    return this._autoBonus2;
  }

  set autoBonus2(value: boolean) {
    this._autoBonus2 = value;
  }

  get autoBonusPoints(): number {
    return this._autoBonusPoints;
  }

  set autoBonusPoints(value: number) {
    this._autoBonusPoints = value;
  }

  get autoStorageFreight(): number {
    return this._autoStorageFreight;
  }

  set autoStorageFreight(value: number) {
    this._autoStorageFreight = value;
  }

  get autoFreight1(): number {
    return this._autoFreight1;
  }

  set autoFreight1(value: number) {
    this._autoFreight1 = value;
  }

  get autoFreight2(): number {
    return this._autoFreight2;
  }

  set autoFreight2(value: number) {
    this._autoFreight2 = value;
  }

  get autoFreight3(): number {
    return this._autoFreight3;
  }

  set autoFreight3(value: number) {
    this._autoFreight3 = value;
  }

  get autoFreightPoints(): number {
    return this._autoFreightPoints;
  }

  set autoFreightPoints(value: number) {
    this._autoFreightPoints = value;
  }

  get teleStorageFreight(): number {
    return this._teleStorageFreight;
  }

  set teleStorageFreight(value: number) {
    this._teleStorageFreight = value;
  }

  get teleFreight1(): number {
    return this._teleFreight1;
  }

  set teleFreight1(value: number) {
    this._teleFreight1 = value;
  }

  get teleFreight2(): number {
    return this._teleFreight2;
  }

  set teleFreight2(value: number) {
    this._teleFreight2 = value;
  }

  get teleFreight3(): number {
    return this._teleFreight3;
  }

  set teleFreight3(value: number) {
    this._teleFreight3 = value;
  }

  get teleAllianceHubPoints(): number {
    return this._teleAllianceHubPoints;
  }

  set teleAllianceHubPoints(value: number) {
    this._teleAllianceHubPoints = value;
  }

  get teleSharedHubPoints(): number {
    return this._teleSharedHubPoints;
  }

  set teleSharedHubPoints(value: number) {
    this._teleSharedHubPoints = value;
  }

  get teleStoragePoints(): number {
    return this._teleStoragePoints;
  }

  set teleStoragePoints(value: number) {
    this._teleStoragePoints = value;
  }

  get sharedFreight(): number {
    return this._sharedFreight;
  }

  set sharedFreight(value: number) {
    this._sharedFreight = value;
  }

  get endDelivered(): number {
    return this._endDelivered;
  }

  set endDelivered(value: number) {
    this._endDelivered = value;
  }

  get endDeliveredPoints(): number {
    return this._endDeliveredPoints;
  }

  set endDeliveredPoints(value: number) {
    this._endDeliveredPoints = value;
  }

  get allianceBalanced(): boolean {
    return this._allianceBalanced;
  }

  set allianceBalanced(value: boolean) {
    this._allianceBalanced = value;
  }

  get allianceBalancedPoints(): number {
    return this._allianceBalancedPoints;
  }

  set allianceBalancedPoints(value: number) {
    this._allianceBalancedPoints = value;
  }

  get sharedUnbalanced(): boolean {
    return this._sharedUnbalanced;
  }

  set sharedUnbalanced(value: boolean) {
    this._sharedUnbalanced = value;
  }

  get sharedUnbalancedPoints(): number {
    return this._sharedUnbalancedPoints;
  }

  set sharedUnbalancedPoints(value: number) {
    this._sharedUnbalancedPoints = value;
  }

  get endParked1(): string {
    return this._endParked1;
  }

  set endParked1(value: string) {
    this._endParked1 = value;
  }

  get endParked2(): string {
    return this._endParked2;
  }

  set endParked2(value: string) {
    this._endParked2 = value;
  }

  get endParkedPoints(): number {
    return this._endParkedPoints;
  }

  set endParkedPoints(value: number) {
    this._endParkedPoints = value;
  }

  get capped(): number {
    return this._capped;
  }

  set capped(value: number) {
    this._capped = value;
  }

  get cappedPoints(): number {
    return this._cappedPoints;
  }

  set cappedPoints(value: number) {
    this._cappedPoints = value;
  }

  get carouselPoints(): number {
    return this._carouselPoints;
  }

  set carouselPoints(value: number) {
    this._carouselPoints = value;
  }

  get totalPoints(): number {
    return this._totalPoints;
  }

  set totalPoints(value: number) {
    this._totalPoints = value;
  }
}
