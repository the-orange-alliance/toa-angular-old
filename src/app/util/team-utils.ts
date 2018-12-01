import Team from "../models/Team";

export class TeamSorter {

  public sort(items: Team[]) {
    items.sort(function(a, b) {
      return (a.teamNumber > b.teamNumber) ? 1 : ((b.teamNumber > a.teamNumber) ? -1 : 0);
    });
    return items;
  }
}
