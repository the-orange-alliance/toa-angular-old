import Award from './Award';
import Team from './Team';

export default class AwardRecipient implements ISerializable {
  private _awardsKey: string;
  private _eventKey: string;
  private _awardKey: string;
  private _teamKey: string;
  private _receiverName: string;
  private _awardName: string;

  private _award: Award;
  private _team: Team;

  constructor() {
    this._awardsKey = '';
    this._eventKey = '';
    this._awardKey = '';
    this._teamKey = '';
    this._receiverName = '';
    this._awardName = '';
    this._award = new Award();
    this._team = new Team();
  }

  toJSON(): object {
    return {
      awards_key: this.awardsKey,
      event_key: this.eventKey,
      award_key: this.awardKey,
      team_key: this.teamKey,
      receiver_name: this.receiverName,
      award_name: this.awardName,
      award: this.award.awardKey.length > 0 ? this.award.toJSON() : undefined,
      team: this.team.teamKey > 0 ? this.team.toJSON() : undefined
    };
  }

  fromJSON(json: any): AwardRecipient {
    const award: AwardRecipient = new AwardRecipient();
    award.awardsKey = json.awards_key;
    award.eventKey = json.event_key;
    award.awardKey = json.award_key;
    award.teamKey = json.team_key;
    award.receiverName = json.receiver_name;
    award.awardName = json.award_name;
    award.award = typeof json.award !== 'undefined' ? new Award().fromJSON(json.award) : undefined;
    award.team = typeof json.team !== 'undefined' ? new Team().fromJSON(json.team) : undefined;
    return award;
  }

  get awardsKey(): string {
    return this._awardsKey;
  }

  set awardsKey(value: string) {
    this._awardsKey = value;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get awardKey(): string {
    return this._awardKey;
  }

  set awardKey(value: string) {
    this._awardKey = value;
  }

  get teamKey(): string {
    return this._teamKey;
  }

  set teamKey(value: string) {
    this._teamKey = value;
  }

  get receiverName(): string {
    return this._receiverName;
  }

  set receiverName(value: string) {
    this._receiverName = value;
  }

  get awardName(): string {
    return this._awardName;
  }

  set awardName(value: string) {
    this._awardName = value;
  }

  get award(): Award {
    return this._award;
  }

  set award(value: Award) {
    this._award = value;
  }

  get team(): Team {
    return this._team;
  }

  set team(value: Team) {
    this._team = value;
  }
}
