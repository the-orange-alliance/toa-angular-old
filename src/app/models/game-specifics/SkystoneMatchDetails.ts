import { ISerializable } from '../ISerializable';
import MatchDetails from '../MatchDetails';
import SkystoneAllianceDetails from './SkystoneAllianceDetails';

export default class SkystoneMatchDetails extends MatchDetails implements ISerializable {
  private _redDtls: SkystoneAllianceDetails;
  private _blueDtls: SkystoneAllianceDetails;
  private _randomization: number;

  constructor() {
    super();
    this._redDtls = new SkystoneAllianceDetails();
    this._blueDtls = new SkystoneAllianceDetails();
    this._randomization = 0;
  }

  toJSON(): object {
    return {
      match_detail_key: this.matchDetailKey,
      match_key: this.matchKey,
      red_min_pen: this.redMinPen,
      blue_min_pen: this.blueMinPen,
      red_maj_pen: this.redMajPen,
      blue_maj_pen: this.blueMajPen,

      red: this.redDtls.toJSON(),
      blue: this.blueDtls.toJSON(),
      randomization: this.randomization
    };
  }

  fromJSON(json: any): SkystoneMatchDetails {
    const details: SkystoneMatchDetails = new SkystoneMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;

    details.redDtls = new SkystoneAllianceDetails().fromJSON(json.red);
    details.blueDtls = new SkystoneAllianceDetails().fromJSON(json.blue);
    details.randomization = json.randomization;
    return details;
  }

  get blueDtls(): SkystoneAllianceDetails {
    return this._blueDtls;
  }

  set blueDtls(value: SkystoneAllianceDetails) {
    this._blueDtls = value;
  }

  get redDtls(): SkystoneAllianceDetails {
    return this._redDtls;
  }

  set redDtls(value: SkystoneAllianceDetails) {
    this._redDtls = value;
  }

  get randomization(): number {
    return this._randomization;
  }

  set randomization(value: number) {
    this._randomization = value;
  }
}
