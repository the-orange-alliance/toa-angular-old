import {
  MatchBreakdownTitle,
  MatchBreakdownField,
  MatchBreakdownBoolField,
  MatchBreakdownRow,
  MatchBreakdownFreightFrenzyParkingLocation, MatchBreakdownBoolFieldVariable, MatchBreakdownFreightFrenzyBarcodeElement,
} from '../../../models/MatchBreakdownRow';
import Match from '../../../models/Match';
import FreightFrenzyAllianceDetails from '../../../models/game-specifics/FreightFrenzyAllianceDetails';
import FreightFrenzyMatchDetails from '../../../models/game-specifics/FreightFrenzyMatchDetails';

export default class MatchBreakdown2122 {

  getRows(match: Match): MatchBreakdownRow[] {
    const details: FreightFrenzyMatchDetails = new FreightFrenzyMatchDetails().fromJSON(match.details.toJSON());
    const red: FreightFrenzyAllianceDetails = details.redDtls;
    const blue: FreightFrenzyAllianceDetails = details.blueDtls;

    const red1AutoBonusPts = red.barcode1 === 'DUCK' ? 10 : 20;
    const red2AutoBonusPts = red.barcode1 === 'DUCK' ? 10 : 20;
    const blue1AutoBonusPts = red.barcode1 === 'DUCK' ? 10 : 20;
    const blue2AutoBonusPts = red.barcode1 === 'DUCK' ? 10 : 20;

    // TODO: Replace team 1 and 2 with actual team numbers?
    return [
      MatchBreakdownTitle('Autonomous', match.redAutoScore, match.blueAutoScore),
      MatchBreakdownFreightFrenzyParkingLocation('Robot 1 Navigated', red.autoNavigated1 , blue.autoNavigated1),
      MatchBreakdownFreightFrenzyParkingLocation('Robot 2 Navigated', red.autoNavigated2 , blue.autoNavigated2),
      MatchBreakdownBoolField('Delivered Duck', red.carousel , blue.carousel, 10),
      MatchBreakdownField('Cargo in Storage', red.autoStorageFreight, blue.autoStorageFreight, 2),
      MatchBreakdownField('Level 1 Cargo', red.autoFreight1, blue.autoFreight1, 6),
      MatchBreakdownField('Level 2 Cargo', red.autoFreight2, blue.autoFreight2, 6),
      MatchBreakdownField('Level 3 Cargo', red.autoFreight3, blue.autoFreight3, 6),
      MatchBreakdownFreightFrenzyBarcodeElement('Barcode Element 1', red.barcode1, blue.barcode1),
      MatchBreakdownFreightFrenzyBarcodeElement('Barcode Element 2', red.barcode2, blue.barcode2),
      MatchBreakdownBoolFieldVariable('Robot 1 Bonus', red.autoBonus1, blue.autoBonus1, red1AutoBonusPts, blue1AutoBonusPts ),
      MatchBreakdownBoolFieldVariable('Robot 2 Bonus', red.autoBonus2, blue.autoBonus1, red2AutoBonusPts, blue2AutoBonusPts ),

      MatchBreakdownTitle('Driver-Controlled', match.redTeleScore, match.blueTeleScore),
      MatchBreakdownField('Storage Unit Freight', red.teleStorageFreight, blue.teleStorageFreight, 1),
      MatchBreakdownField('Level 1 Cargo', red.teleFreight1, blue.teleFreight1, 2),
      MatchBreakdownField('Level 2 Cargo', red.teleFreight2, blue.teleFreight2, 3),
      MatchBreakdownField('Level 3 Cargo', red.teleFreight3, blue.teleFreight3, 6),
      MatchBreakdownField('Shared Hub Freight', red.sharedFreight, blue.sharedFreight, 4),

      MatchBreakdownTitle('End Game', match.redEndScore, match.blueEndScore),
      MatchBreakdownField('Duck or Shipping Element Delivered', red.endDelivered, blue.endDelivered, 6),
      MatchBreakdownField('Shipping Hub Capped', red.capped , blue.capped, 15),
      MatchBreakdownField('Shipping Hub Capped', red.capped , blue.capped, 15),
      MatchBreakdownBoolField('Alliance Hub Balanced', red.allianceBalanced, blue.allianceBalanced, 10),
      MatchBreakdownBoolField('Shared Hub Unbalanced', red.sharedUnbalanced, blue.sharedUnbalanced, 20),
      MatchBreakdownFreightFrenzyParkingLocation('Robot 1 Navigated', red.endParked1, blue.endParked1),
      MatchBreakdownFreightFrenzyParkingLocation('Robot 2 Navigated', red.endParked2, blue.endParked2),

      MatchBreakdownTitle('Penalty', match.redPenalty, match.bluePenalty),
      MatchBreakdownField('Minor Penalty', details.redMinPen, details.blueMinPen, 5),
      MatchBreakdownField('Major Penalty', details.redMajPen, details.blueMajPen, 20)
    ];
  }
}
