import MatchDetails from '../MatchDetails';
import UltimateGoalAllianceDetails from './UltimateGoalAllianceDetails';
import {ISerializable} from '../ISerializable';
import FreightFrenzyAllianceDetails from './FreightFrenzyAllianceDetails';

export default class FreightFrenzyMatchDetails extends MatchDetails implements ISerializable {
  private _redDtls: FreightFrenzyAllianceDetails;
  private _blueDtls: FreightFrenzyAllianceDetails;

  constructor() {
    super();
    this._redDtls = new FreightFrenzyAllianceDetails();
    this._blueDtls = new FreightFrenzyAllianceDetails();
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
    };
  }

  fromJSON(json: any): FreightFrenzyMatchDetails {
    const details: FreightFrenzyMatchDetails = new FreightFrenzyMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;

    details.redDtls = new FreightFrenzyAllianceDetails().fromJSON(json.red);
    details.blueDtls = new FreightFrenzyAllianceDetails().fromJSON(json.blue);
    return details;
  }

  fromNormalJSON(json: any): FreightFrenzyMatchDetails {
    const details: FreightFrenzyMatchDetails = new FreightFrenzyMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;

    details.redDtls = new FreightFrenzyAllianceDetails().fromJSON(json.red);
    details.blueDtls = new FreightFrenzyAllianceDetails().fromJSON(json.blue);
    return details;
  }

  get blueDtls(): FreightFrenzyAllianceDetails {
    return this._blueDtls;
  }

  set blueDtls(value: FreightFrenzyAllianceDetails) {
    this._blueDtls = value;
  }

  get redDtls(): FreightFrenzyAllianceDetails {
    return this._redDtls;
  }

  set redDtls(value: FreightFrenzyAllianceDetails) {
    this._redDtls = value;
  }
}
