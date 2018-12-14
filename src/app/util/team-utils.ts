import Team from '../models/Team';
import EventParticipant from '../models/EventParticipant';

export class TeamSorter {

  public sort(items: Team[]) {
    items.sort(function(a, b) {
      return (a.teamNumber > b.teamNumber) ? 1 : ((b.teamNumber > a.teamNumber) ? -1 : 0);
    });
    return items;
  }

  public sortEventParticipant(items: EventParticipant[]) {
    items.sort(function(a, b) {
      return (a.team.teamNumber > b.team.teamNumber) ? 1 : ((b.team.teamNumber > a.team.teamNumber) ? -1 : 0);
    });
    return items;
  }
}
