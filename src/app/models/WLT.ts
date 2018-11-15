export default class WLT implements ISerializable {
  private _wins: number;
  private _losses: number;
  private _ties: number;

  constructor() {
    this._wins = 0;
    this._losses = 0;
    this._ties = 0;
  }

  toJSON(): object {
    return {
      wins: this.wins,
      losses: this.losses,
      ties: this.ties,
    };
  }

  fromJSON(json: any): WLT {
    const wlt: WLT = new WLT();
    wlt.wins = json.wins;
    wlt.ties = json.ties;
    wlt.losses = json.losses;
    return wlt;
  }


  get wins(): number {
    return this._wins;
  }

  set wins(value: number) {
    this._wins = value;
  }

  get losses(): number {
    return this._losses;
  }

  set losses(value: number) {
    this._losses = value;
  }

  get ties(): number {
    return this._ties;
  }

  set ties(value: number) {
    this._ties = value;
  }
}
