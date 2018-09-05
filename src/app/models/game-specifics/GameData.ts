import MatchDetails from "../MatchDetails";
import RelicRecoveryMatchDetails from "./RelicRecoveryMatchDetails";
import VelocityVortexMatchDetails from "./VelocityVortexMatchDetails";

export function getMatchDetails(seasonKey: string): MatchDetails {
  switch (seasonKey) {
    case "1617":
      return new VelocityVortexMatchDetails();
    case "1718":
      return new RelicRecoveryMatchDetails();
    default:
      return new MatchDetails();
  }
}