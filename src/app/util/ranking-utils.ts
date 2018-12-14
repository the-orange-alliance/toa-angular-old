import Ranking from '../models/Ranking';

export class RankSorter {

  public sort(items: Ranking[]) {
    items.sort(function(a, b) {
      return (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0);
    });
    return items;
  }
}
