import { Component, Input } from '@angular/core';
import Match from '../../models/Match';
import Team from '../../models/Team';
import Ranking from '../../models/Ranking';
import EventParticipant from '../../models/EventParticipant';

@Component({
  selector: 'match-table',
  templateUrl: './match-table.component.html'
})
export class MatchTableComponent {
  @Input() matchList?: Match[];
  @Input() match?: Match;
  @Input() team?: Team;

  @Input() teams?: EventParticipant[];
  @Input() rankings?: Ranking[];
  private selectedTeam = 0;
  selectedTeamParticipant: EventParticipant = null;

  public getMatchResultString(match: Match): string {
    let teamStation = 0;
    for (const participant of match.participants) {
      if (participant.teamKey === this.team.teamKey) {
        teamStation = participant.station;
        break;
      }
    }

    if (match.redScore == null || match.blueScore == null) {
      return '';
    } else if (teamStation < 20 && match.redScore > match.blueScore) {
      return 'W';
    } else if (match.redScore === match.blueScore) {
      return 'T';
    } else if (teamStation > 20 && match.redScore < match.blueScore) {
      return 'W';
    } else {
      return 'L';
    }
  }

  public getParticipantString(match: Match, index: number): string {
    return match.participants[index].teamKey +
      (match.participants[index].stationStatus === 0 ? '*' : '');
  }

  public getParticipantStringWithoutStatus(match: Match, index: number): string {
    return match.participants[index].teamKey + '';
  }

  public isSelectedTeam(match: Match, index: number): boolean {
    if (this.team) {
      return match.participants[index].teamKey === this.team.teamKey; // === isn't working
    } else {
      return match.participants[index].teamKey === this.selectedTeam;
    }
  }

  private selectTeam(match: Match, index: number) {
    if (match.participants[index].teamKey !== this.selectedTeam) {
      this.selectedTeam = match.participants[index].teamKey;

      for (const _team of this.teams) {
        if (_team.teamKey === this.selectedTeam) {
          this.selectedTeamParticipant = _team;
          break;
        }
      }
      for (const ranking of this.rankings) {
        if (this.selectedTeamParticipant && ranking.teamKey === this.selectedTeam) {
          this.selectedTeamParticipant.team.rankings = [ranking];
          break;
        }
      }
    } else {
      this.selectedTeam = 0;
      this.selectedTeamParticipant = null;
    }
  }
}
