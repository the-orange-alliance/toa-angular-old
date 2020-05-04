import Ranking from '../models/Ranking';

export enum RankSortType {
  Rank = "Rank",
  TeamNumber = "TeamNumber",
  WLT = "WLT",
  HighScore = "HighScore",
  MatchesPlayed = "MatchesPlayed",
  OPR = "OPR",
  NPOPR = "NPOPR"
}

export class RankSorter {
  // These are reversed from what is expected because they are inverted the first time they are used in sort()
  private rankSortTypeIsReversed: Record<RankSortType, boolean> = {
    Rank: true,
    TeamNumber: true,
    WLT: false,
    HighScore: false,
    MatchesPlayed: false,
    OPR: false,
    NPOPR: false
  }

  public sort(items: Ranking[], sortType: RankSortType) {
    this.rankSortTypeIsReversed[sortType] = !this.rankSortTypeIsReversed[sortType]

    switch (sortType) {
      case RankSortType.Rank:
        return this.sortByRank(items);
      case RankSortType.TeamNumber:
        return this.sortByTeamNumber(items);
      case RankSortType.WLT:
        return this.sortByWinsLossesTies(items);
      case RankSortType.HighScore:
        return this.sortByHighScore(items);
      case RankSortType.MatchesPlayed:
        return this.sortByMatchesPlayed(items);
      case RankSortType.OPR:
        return this.sortByOPR(items);
      case RankSortType.NPOPR:
        return this.sortByNonPenaltyOPR(items);
    }
  }

  private sortByRank(items: Ranking[]) {    
    return this.sortedByArgument(items, function(ranking) {
      return ranking.rank;
    }, this.rankSortTypeIsReversed[RankSortType.Rank]);
  }

  private sortByTeamNumber(items: Ranking[]) {
    return this.sortedByArgument(items, function(ranking) {
      return ranking.team.teamNumber;
    }, this.rankSortTypeIsReversed[RankSortType.TeamNumber]);
  }

  private sortByWinsLossesTies(items: Ranking[]) {
    return this.sortedByArgument(items, function(ranking) {
      return ranking.wins - ranking.losses + (ranking.ties / 2.0);
    }, this.rankSortTypeIsReversed[RankSortType.WLT]);
  }

  private sortByHighScore(items: Ranking[]) {
    return this.sortedByArgument(items, function(ranking) {
      return ranking.highestQualScore;
    }, this.rankSortTypeIsReversed[RankSortType.HighScore]);
  }

  private sortByMatchesPlayed(items: Ranking[]) {
    return this.sortedByArgument(items, function(ranking) {
      return ranking.played;
    }, this.rankSortTypeIsReversed[RankSortType.MatchesPlayed]);
  }

  private sortByOPR(items: Ranking[]) {
    return this.sortedByArgument(items, function(ranking) {
      return ranking.opr;
    }, this.rankSortTypeIsReversed[RankSortType.OPR]);
  }

  private sortByNonPenaltyOPR(items: Ranking[]) {
    return this.sortedByArgument(items, function(ranking) {
      return ranking.npOpr;
    }, this.rankSortTypeIsReversed[RankSortType.NPOPR]);
  }

  private sortedByArgument(items: Ranking[], argument: {(arg0: Ranking): number}, reversed) {
    items.sort(function(a, b) {
      let aResult = argument(a);
      let bResult = argument(b);  

      if (aResult == bResult) {
        return a.rank < b.rank ? 1 : -1
      }

      return aResult > bResult ? 1 : -1;
    });

    if (reversed) {
      items.reverse()
    }

    return items;
  }
}
