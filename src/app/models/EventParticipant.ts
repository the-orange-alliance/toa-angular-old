import Team from './Team';

export default class EventParticipant implements ISerializable {
  private _eventParticipantKey: string;
  private _eventKey: string;
  private _teamKey: number;
  private _isActive: boolean;
  private _cardStatus: string;

  private _team: Team;

  constructor() {
    this._eventParticipantKey = '';
    this._eventKey = '';
    this._teamKey = 0;
    this._isActive = false;
    this._cardStatus = '';
    this._team = new Team();
  }

  toJSON(): object {
    return {
      event_participant_key: this.eventParticipantKey,
      event_key: this.eventKey,
      team_key: this.teamKey,
      is_active: this.isActive,
      card_status: this.cardStatus,
      team: this.team.teamKey > 0 ? this.team.toJSON() : undefined
    };
  }

  fromJSON(json: any): EventParticipant {
    const participant: EventParticipant = new EventParticipant();
    participant.eventParticipantKey = json.event_participant_key;
    participant.eventKey = json.event_key;
    participant.teamKey = json.team_key;
    participant.isActive = json.is_active;
    participant.cardStatus = json.card_status;
    participant.team = new Team().fromJSON(json.team);
    return participant;
  }

  get eventParticipantKey(): string {
    return this._eventParticipantKey;
  }

  set eventParticipantKey(value: string) {
    this._eventParticipantKey = value;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get teamKey(): number {
    return this._teamKey;
  }

  set teamKey(value: number) {
    this._teamKey = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get cardStatus(): string {
    return this._cardStatus;
  }

  set cardStatus(value: string) {
    this._cardStatus = value;
  }

  get team(): Team {
    return this._team;
  }

  set team(value: Team) {
    this._team = value;
  }
}
