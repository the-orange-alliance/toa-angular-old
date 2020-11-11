import Insights from '../Insights';
import RelicRecoveryInsights from './RelicRecoveryInsights';
import RoverRuckusInsights from './RoverRuckusInsights';
import UltimateGoalInsights from './UltimateGoalInsights';
import SkystoneInsights from './SkystoneInsights';

export function getInsights(seasonKey: string): Insights {
  switch (seasonKey) {
    // case '1617':
    //   return new VelocityVortexInsights();
    case '1718':
      return new RelicRecoveryInsights();
    case '1819':
      return new RoverRuckusInsights();
    case '1920':
      return new SkystoneInsights();
    case '2021':
      return new UltimateGoalInsights();
    default:
      return new Insights();
  }
}
