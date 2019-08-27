import { MatchBreakdownTitle, MatchBreakdownField, MatchBreakdownRow } from '../../../models/MatchBreakdownRow';
import RelicRecoveryMatchDetails from '../../../models/game-specifics/RelicRecoveryMatchDetails';
import Match from '../../../models/Match';

export default class MatchBreakdown1718 {

  getRows(match: Match): MatchBreakdownRow[] {
    const details: RelicRecoveryMatchDetails = new RelicRecoveryMatchDetails().fromJSON(match.details.toJSON());
    return [
      MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
      MatchBreakdownField('Single Jewel Remaining', details.redAutoJewels, details.blueAutoJewels, 30),
      MatchBreakdownField('Glyphs', details.redAutoGlyphs, details.blueAutoGlyphs, 15),
      MatchBreakdownField('Cryptobox Keys', details.redAutoKeys, details.blueAutoKeys, 30),
      MatchBreakdownField('Robots in Safe Zone', details.redAutoParks, details.blueAutoParks, 10),

      MatchBreakdownTitle('Teleop', match.redTeleScore, match.blueTeleScore),
      MatchBreakdownField('Glyphs', details.redTeleGlyphs, details.blueTeleGlyphs, 2),
      MatchBreakdownField('Rows in Cryptoboxes', details.redTeleRows, details.blueTeleRows, 10),
      MatchBreakdownField('Columns in Cryptoboxes', details.redTeleColumns, details.blueTeleColumns, 20),
      MatchBreakdownField('Cryptoboxes Ciphers', details.redTeleCypher, details.redTeleCypher, 30),

      MatchBreakdownTitle('End Game', match.redEndScore, match.blueEndScore),
      MatchBreakdownField('Relics in Zone 1', details.redEndRelic1, details.blueEndRelic1, 10),
      MatchBreakdownField('Relics in Zone 2', details.redEndRelic2, details.blueEndRelic2, 20),
      MatchBreakdownField('Relics in Zone 3', details.redEndRelic3, details.blueEndRelic2, 40),
      MatchBreakdownField('Relics Upright', details.redEndRelicStanding, details.blueEndRelicStanding, 15),
      MatchBreakdownField('Robots Balanced', details.redEndRobotBalances, details.blueEndRobotBalances, 20),

      MatchBreakdownTitle('Penalty', match.bluePenalty, match.redPenalty),
      MatchBreakdownField('Minor Penalty', details.blueMinPen, details.redMinPen, 10),
      MatchBreakdownField('Major Penalty', details.blueMajPen, details.redMajPen, 40)
    ];
  }
}
