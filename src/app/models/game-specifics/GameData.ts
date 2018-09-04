import MatchDetails from "../MatchDetails";
import RelicRecoveryMatchDetails from "./RelicRecoveryMatchDetails";

export function getMatchDetails(seasonKey: string): MatchDetails {
  switch (seasonKey) {
    case "1617":
      return new RelicRecoveryMatchDetails();
    case "1718":
      return new RelicRecoveryMatchDetails();
    default:
      return new MatchDetails();
  }
}