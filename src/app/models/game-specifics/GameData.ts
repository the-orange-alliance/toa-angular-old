import MatchDetails from '../MatchDetails';
import RelicRecoveryMatchDetails from './RelicRecoveryMatchDetails';
import VelocityVortexMatchDetails from './VelocityVortexMatchDetails';
import RoverRuckusMatchDetails from './RoverRuckusMatchDetails';
import SkystoneMatchDetails from './SkystoneMatchDetails';

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
    default:
      return new MatchDetails();
  }
}
