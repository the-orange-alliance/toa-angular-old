import Ranking from '../models/Ranking';

export class RankSorter {

  public sortByRank(items: Ranking[]) {
    items.sort(function(a, b) {
      return a.rank - b.rank;
    });
    return items;
  }

  public sortByTeam(items: Ranking[]) {
    items.sort(function(a, b) {
      return a.team.teamNumber - b.team.teamNumber;
    });
    return items;
  }
}
