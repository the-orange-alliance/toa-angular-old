import MatchDetails from '../MatchDetails';
import RelicRecoveryMatchDetails from './RelicRecoveryMatchDetails';
import VelocityVortexMatchDetails from './VelocityVortexMatchDetails';
import RoverRuckusMatchDetails from './RoverRuckusMatchDetails';
import SkystoneMatchDetails from './SkystoneMatchDetails';
import UltimateGoalMatchDetails from './UltimateGoalMatchDetails';
import FreightFrenzyMatchDetails from './FreightFrenzyMatchDetails';

export function getMatchDetails(seasonKey: string): MatchDetails {
  switch (seasonKey) {
    case '1617':
      return new VelocityVortexMatchDetails();
    case '1718':
      return new RelicRecoveryMatchDetails();
    case '1819':
      return new RoverRuckusMatchDetails();
    case '1920':
      return new SkystoneMatchDetails();
    case '2021':
      return new UltimateGoalMatchDetails();
    case '2122':
      return new FreightFrenzyMatchDetails();
    default:
      return new MatchDetails();
  }
}
