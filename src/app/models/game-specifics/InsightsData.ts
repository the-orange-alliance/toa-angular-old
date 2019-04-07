import Insights from '../Insights';
import RelicRecoveryInsights from './RelicRecoveryInsights';
import RoverRuckusInsights from './RoverRuckusInsights';

export function getInsights(seasonKey: string): Insights {
  switch (seasonKey) {
    // case '1617':
    //   return new VelocityVortexInsights();
    case '1718':
      return new RelicRecoveryInsights();
    case '1819':
      return new RoverRuckusInsights();
    default:
      return new Insights();
  }
}
