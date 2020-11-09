import MatchDetails from '../MatchDetails';
import UltimateGoalAllianceDetails from './UltimateGoalAllianceDetails';
import {ISerializable} from '../ISerializable';

export default class UltimateGoalMatchDetails extends MatchDetails implements ISerializable {
  private _redDtls: UltimateGoalAllianceDetails;
  private _blueDtls: UltimateGoalAllianceDetails;

  constructor() {
    super();
    this._redDtls = new UltimateGoalAllianceDetails();
    this._blueDtls = new UltimateGoalAllianceDetails();
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

  fromJSON(json: any): UltimateGoalMatchDetails {
    const details: UltimateGoalMatchDetails = new UltimateGoalMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;

    details.redDtls = new UltimateGoalAllianceDetails().fromJSON(json.red);
    details.blueDtls = new UltimateGoalAllianceDetails().fromJSON(json.blue);
    return details;
  }

  fromNormalJSON(json: any): UltimateGoalMatchDetails {
    const details: UltimateGoalMatchDetails = new UltimateGoalMatchDetails();
    details.matchDetailKey = json.match_detail_key;
    details.matchKey = json.match_key;
    details.redMinPen = json.red_min_pen;
    details.blueMinPen = json.blue_min_pen;
    details.redMajPen = json.red_maj_pen;
    details.blueMajPen = json.blue_maj_pen;

    details.redDtls = new UltimateGoalAllianceDetails().fromJSON(json.red);
    details.blueDtls = new UltimateGoalAllianceDetails().fromJSON(json.blue);
    return details;
  }

  get blueDtls(): UltimateGoalAllianceDetails {
    return this._blueDtls;
  }

  set blueDtls(value: UltimateGoalAllianceDetails) {
    this._blueDtls = value;
  }

  get redDtls(): UltimateGoalAllianceDetails {
    return this._redDtls;
  }

  set redDtls(value: UltimateGoalAllianceDetails) {
    this._redDtls = value;
  }
}
