import Team from '../models/Team';
import EventParticipant from '../models/EventParticipant';

export class TeamSorter {

  public sort(items: Team[]) {
    items.sort(function(a, b) {
      return (a.teamKey > b.teamKey) ? 1 : ((b.teamKey > a.teamKey) ? -1 : 0);
    });
    return items;
  }

  public sortEventParticipant(items: EventParticipant[]) {
    items.sort(function(a, b) {
      return (a.team.teamKey > b.team.teamKey) ? 1 : ((b.team.teamKey > a.team.teamKey) ? -1 : 0);
    });
    return items;
  }
}
