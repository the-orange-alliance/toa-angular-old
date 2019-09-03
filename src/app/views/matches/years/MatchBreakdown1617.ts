import {
  MatchBreakdownRow,
  MatchBreakdownTitle,
  MatchBreakdownField,
  MatchBreakdownBoolField,
  MatchBreakdownVelocityVortexParkingField,
  MatchBreakdownVelocityVortexCapBallField
} from '../../../models/MatchBreakdownRow';
import VelocityVortexMatchDetails from '../../../models/game-specifics/VelocityVortexMatchDetails';
import Match from '../../../models/Match';

export default class MatchBreakdown1617 {

  getRows(match: Match): MatchBreakdownRow[] {
    const details: VelocityVortexMatchDetails = new VelocityVortexMatchDetails().fromJSON(match.details.toJSON());
    return [
      MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
      MatchBreakdownField('Center Vortex', details.redAutoPartCen, details.blueAutoPartCen, 15),
      MatchBreakdownField('Corner Vortex', details.redAutoPartCor, details.blueAutoPartCor, 5),
      MatchBreakdownField('Beacons', details.redAutoBeacons, details.blueAutoBeacons, 30),
      MatchBreakdownBoolField('Cap Ball on Floor', details.redAutoCap, details.blueAutoCap, 5),
      MatchBreakdownVelocityVortexParkingField('Robot One Parked', details.redAutoRobot1, details.blueAutoRobot1),
      MatchBreakdownVelocityVortexParkingField('Robot Two Parked', details.redAutoRobot2, details.blueAutoRobot2),

      MatchBreakdownTitle('Teleop', match.redTeleScore + match.redEndScore, match.blueTeleScore + match.blueEndScore),
      MatchBreakdownField('Center Vortex', details.redTelePartCen, details.blueTelePartCen, 5),
      MatchBreakdownField('Corner Vortex', details.redTelePartCor, details.blueTelePartCor, 1),
      MatchBreakdownField('Beacons', details.redTeleBeacons, details.blueTeleBeacons, 10),
      MatchBreakdownVelocityVortexCapBallField('Cap Ball', details.redTeleCap, details.blueTeleCap),

      MatchBreakdownTitle('Penalty', match.bluePenalty, match.redPenalty),
      MatchBreakdownField('Minor Penalty', details.blueMinPen, details.redMinPen, 10),
      MatchBreakdownField('Major Penalty', details.blueMajPen, details.redMajPen, 40)
    ];
  }
}
