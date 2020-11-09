import { MatchBreakdownTitle, MatchBreakdownField, MatchBreakdownBoolField, MatchBreakdownRow } from '../../../models/MatchBreakdownRow';
import SkystoneMatchDetails from '../../../models/game-specifics/SkystoneMatchDetails';
import SkystoneAllianceDetails from '../../../models/game-specifics/SkystoneAllianceDetails';
import Match from '../../../models/Match';

export default class MatchBreakdown1920 {

  getRows(match: Match): MatchBreakdownRow[] {
    const details: SkystoneMatchDetails = new SkystoneMatchDetails().fromJSON(match.details.toJSON());
    const red: SkystoneAllianceDetails = details.redDtls;
    const blue: SkystoneAllianceDetails = details.blueDtls;
    return [
      MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
      MatchBreakdownBoolField('Repositioning Foundation', red.foundationRepositioned , blue.foundationRepositioned, 10),
      MatchBreakdownField('Delivering Skystones', red.autoDeliveredSkystones, blue.autoDeliveredSkystones, 10),
      MatchBreakdownField('Delivering Stones under Alliance Skybridge', red.autoDeliveredStones , blue.autoDeliveredStones, 2),
      MatchBreakdownField('Stones on Foundation', red.autoPlaced , blue.autoPlaced, 4),
      MatchBreakdownField('Navigating under Skybridge', this.getNavigatingRobots(red) , this.getNavigatingRobots(blue), 5),

      ...(red.autoReturned > 0 || blue.autoReturned > 0 ? [
        MatchBreakdownField('Returned Stones', red.autoReturned, blue.autoReturned, -2),
        MatchBreakdownBoolField('First returned Skystone', red.firstReturnedIsSkystone, blue.firstReturnedIsSkystone, -8),
      ] : []),

      MatchBreakdownTitle('Driver-Controlled', match.redTeleScore, match.blueTeleScore),
      MatchBreakdownField('Delivering Stones under Alliance Skybridge', red.teleDelivered , blue.teleDelivered, 1),
      MatchBreakdownField('Stones on Foundation', red.telePlaced , blue.telePlaced, 1),
      MatchBreakdownField('Skyscraper Bonus', red.towerBonus, blue.towerBonus, 2),
      MatchBreakdownField('Returned Stones', red.teleReturned, blue.teleReturned, -1),

      MatchBreakdownTitle('End Game', match.redEndScore, match.blueEndScore),
      MatchBreakdownField('Capping Bonus', red.cappingBonus, blue.cappingBonus, 5),
      MatchBreakdownField('Level Bonus', this.getCapLevel(red), this.getCapLevel(blue), 1),
      MatchBreakdownBoolField('Moving Foundation', red.foundationMoved, blue.foundationMoved, 15),
      MatchBreakdownField('Robots Parked', red.endRobotsParked, blue.endRobotsParked, 5),

      MatchBreakdownTitle('Penalty', match.redPenalty, match.bluePenalty),
      MatchBreakdownField('Minor Penalty', details.blueMinPen, details.redMinPen, 5),
      MatchBreakdownField('Major Penalty', details.blueMajPen, details.redMajPen, 20)
    ];
  }

  getNavigatingRobots(allianceDetails: SkystoneAllianceDetails) {
    return (allianceDetails.robot1Nav ? 1 : 0) + (allianceDetails.robot2Nav ? 1 : 0);
  }

  getCapLevel(allianceDetails: SkystoneAllianceDetails) {
    const level1 = allianceDetails.robot1CapLevel === -1 ? 0 : allianceDetails.robot1CapLevel;
    const level2 = allianceDetails.robot2CapLevel === -1 ? 0 : allianceDetails.robot2CapLevel;
    return level1 + level2;
  }
}
