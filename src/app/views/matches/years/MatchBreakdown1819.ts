import { MatchBreakdownTitle, MatchBreakdownField, MatchBreakdownRow } from '../../../models/MatchBreakdownRow';
import RoverRuckusMatchDetails from '../../../models/game-specifics/RoverRuckusMatchDetails';
import Match from '../../../models/Match';

export default class MatchBreakdown1819 {

  getRows(match: Match): MatchBreakdownRow[] {
    const details: RoverRuckusMatchDetails = new RoverRuckusMatchDetails().fromJSON(match.details.toJSON());
    return [
      MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
      MatchBreakdownField('Landing', details.redAutoLand, details.blueAutoLand, 30),
      MatchBreakdownField('Sampling', details.redAutoSamp, details.blueAutoSamp, 25),
      MatchBreakdownField('Claiming', details.redAutoClaim, details.blueAutoClaim, 15),
      MatchBreakdownField('Parking', details.redAutoPark, details.blueAutoPark, 10),

      MatchBreakdownTitle('Teleop', match.redTeleScore, match.blueTeleScore),
      MatchBreakdownField('Gold Minerals', details.redDriverGold, details.blueDriverGold, 5),
      MatchBreakdownField('Silver Minerals', details.redDriverSilver, details.blueDriverSilver, 5),
      MatchBreakdownField('Any Mineral in Depot', details.redDriverDepot, details.blueDriverDepot, 2),

      MatchBreakdownTitle('End Game', match.redEndScore, match.blueEndScore),
      MatchBreakdownField('Robots Latched', details.redEndLatch, details.blueEndLatch, 50),
      MatchBreakdownField('Robots Parked', details.redEndIn, details.blueEndIn, 15),
      MatchBreakdownField('Robots Parked Completely', details.redEndComp, details.blueEndComp, 25),

      MatchBreakdownTitle('Penalty', match.bluePenalty, match.redPenalty),
      MatchBreakdownField('Minor Penalty', details.blueMinPen, details.redMinPen, 10),
      MatchBreakdownField('Major Penalty', details.blueMajPen, details.redMajPen, 40)
    ];
  }
}
