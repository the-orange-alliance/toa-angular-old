import { Component, Input } from '@angular/core';
import { MdcDialog } from '@angular-mdc/web';
import { DialogMatch } from '../../dialogs/match/dialog-match';
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
  @Input() singleTeamSort?: any[];

  @Input() teams?: EventParticipant[];
  @Input() rankings?: Ranking[];
  private selectedTeam = '';
  selectedTeamParticipant: EventParticipant = null;

  constructor(private dialog: MdcDialog) {

  }

  public filterByTeam(): any[] {
    const returnValue = [];
    for (const m of this.matchList) {
      if (m.participants[0].teamKey === this.team.teamKey) {
        returnValue.push(m);
      }
    }
    return returnValue;
  }

  public getRank(teamKey: string): Ranking {
    for (const r of this.rankings) {
      if (r.teamKey === teamKey) {
        return r;
      }
    }
    return new Ranking();
  }

  public getMatchResultString(match: Match): string {
    let teamStation = 0;
    for (const participant of match.participants) {
      if (participant.teamKey === this.team.teamKey) {
        teamStation = participant.station;
        break;
      }
    }

    if (match.redScore === null || match.blueScore === null ||
        match.redScore === -1 || match.blueScore === -1) {
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
      this.selectedTeam = '';
      this.selectedTeamParticipant = null;
    }
  }

  openMatch(match: Match) {
    this.dialog.open(DialogMatch, {
      scrollable: true,
      data: {match: match}
    });
  }
}
