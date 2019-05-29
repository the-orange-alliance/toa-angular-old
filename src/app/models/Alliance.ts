import { ISerializable } from './ISerializable';
import Team from './Team';

export default class Alliance implements ISerializable {
 private _seed: number;
 private _captain: Team;
 private _pick1: Team;
 private _pick2: Team|null;

 constructor() {
   this._seed = 0;
   this._captain = new Team();
   this._pick1 = new Team();
   this._pick2 = null;
 }

 toJSON(): object {
   return {
    seed: this.seed,
    captain: this.captain.teamNumber > 0 ? this.captain.toJSON() : null,
    pick1: this.pick1.teamNumber > 0 ? this.pick1.toJSON() : null,
    pick2: this.pick2 ? this.pick2.toJSON() : null
   };
 }

 fromJSON(json: any): Alliance {
   const alliance: Alliance = new Alliance();
   alliance.seed = json.seed;
   alliance.captain = new Team().fromJSON(json.captain);
   alliance.pick1 = new Team().fromJSON(json.pick1);
   alliance.pick2 = json.pick2 ? new Team().fromJSON(json.pick2) : null;
   return alliance;
 }

  get seed(): number {
    return this._seed;
  }

  set seed(value: number) {
    this._seed = value;
  }

  get captain(): Team {
    return this._captain;
  }

  set captain(value: Team) {
    this._captain = value;
  }

  get pick1(): Team {
    return this._pick1;
  }

  set pick1(value: Team) {
    this._pick1 = value;
  }

  get pick2(): Team|null {
    return this._pick2;
  }

  set pick2(value: Team|null) {
    this._pick2 = value;
  }
}
