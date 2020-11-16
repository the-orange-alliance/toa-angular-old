import {MatchBreakdownTitle, MatchBreakdownField, MatchBreakdownBoolField, MatchBreakdownRow, MatchBreakdownUltimateGoalWobbleField} from '../../../models/MatchBreakdownRow';
import Match from '../../../models/Match';
import UltimateGoalMatchDetails from '../../../models/game-specifics/UltimateGoalMatchDetails';
import UltimateGoalAllianceDetails from '../../../models/game-specifics/UltimateGoalAllianceDetails';

export default class MatchBreakdown2021 {

  getRows(match: Match): MatchBreakdownRow[] {
    const details: UltimateGoalMatchDetails = new UltimateGoalMatchDetails().fromJSON(match.details.toJSON());
    const red: UltimateGoalAllianceDetails = details.redDtls;
    const blue: UltimateGoalAllianceDetails = details.blueDtls;

    return [
      MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
      MatchBreakdownField('Rings Scored High', red.autoTowerHigh , blue.autoTowerHigh, 12),
      MatchBreakdownField('Rings Scored Middle', red.autoTowerMid , blue.autoTowerMid, 6),
      MatchBreakdownField('Rings Scored Low', red.autoTowerLow , blue.autoTowerLow, 3),
      MatchBreakdownField('PowerShots Successfully Launched Back', red.autoPowerShotPoints / 15, blue.autoPowerShotPoints / 15, 15),
      MatchBreakdownBoolField('Wobble Goal 1 Delivered', red.wobbleDelivered1 , blue.wobbleDelivered1 , 15),
      MatchBreakdownBoolField('Wobble Goal 2 Delivered', red.wobbleDelivered2 , blue.wobbleDelivered2 , 15),
      MatchBreakdownBoolField('Red Robot 1 Navigated', red.navigated1 , blue.navigated1 , 5),
      MatchBreakdownBoolField('Red Robot 2 Navigated', red.navigated2 , blue.navigated2 , 5),

      MatchBreakdownTitle('Driver-Controlled', match.redTeleScore, match.blueTeleScore),
      MatchBreakdownField('Rings Scored High', red.dcTowerHigh , blue.dcTowerHigh, 6),
      MatchBreakdownField('Rings Scored Middle', red.dcTowerMid , blue.dcTowerMid, 4),
      MatchBreakdownField('Rings Scored Low', red.dcTowerLow, blue.dcTowerLow, 2 ),

      MatchBreakdownTitle('End Game', match.redEndScore, match.blueEndScore),
      MatchBreakdownField('Rings on Wobble Goal 1', red.wobbleRings1, blue.wobbleRings1, 5),
      MatchBreakdownField('Rings on Wobble Goal 2', red.wobbleRings2, blue.wobbleRings2, 5),
      MatchBreakdownUltimateGoalWobbleField('Wobble Goal 1 End Position', red.wobbleEnd1, blue.wobbleEnd1),
      MatchBreakdownUltimateGoalWobbleField('Wobble Goal 2 End Position', red.wobbleEnd2, blue.wobbleEnd2),
      MatchBreakdownField('PowerShots Successfully Launched Back', red.endPowerShotPoints / 15, blue.endPowerShotPoints / 15, 15),

      MatchBreakdownTitle('Penalty', match.redPenalty, match.bluePenalty),
      MatchBreakdownField('Minor Penalty', details.redMinPen, details.blueMinPen, 5),
      MatchBreakdownField('Major Penalty', details.redMajPen, details.blueMajPen, 20)
    ];
  }
}
