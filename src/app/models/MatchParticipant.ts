import Team from './Team';

export default class MatchParticipant implements ISerializable {
 private _matchParticipantKey: string;
 private _matchKey: string;
 private _teamKey: number;
 private _station: number;
 private _stationStatus: number;
 private _refStatus: number;
 private _team: Team;

 constructor() {
   this._matchParticipantKey = '';
   this._matchKey = '';
   this._teamKey = 0;
   this._station = 0;
   this._stationStatus = 0;
   this._refStatus = 0;
   this._team = new Team();
 }

 toJSON(): object {
   return {
     match_participant_key: this.matchParticipantKey,
     match_key: this.matchKey,
     team_key: this.teamKey,
     station: this.station,
     station_status: this.stationStatus,
     ref_status: this.refStatus,
     team: this.team
   };
 }

 fromJSON(json: any): MatchParticipant {
   const participant: MatchParticipant = new MatchParticipant();
   participant.matchParticipantKey = json.match_participant_key;
   participant.matchKey = json.match_key;
   participant.teamKey = json.team_key;
   participant.station = json.station;
   participant.stationStatus = json.station_status;
   participant.refStatus = json.ref_status;
   participant.team = json.team;
   return participant;
 }

  get matchParticipantKey(): string {
    return this._matchParticipantKey;
  }

  set matchParticipantKey(value: string) {
    this._matchParticipantKey = value;
  }

  get matchKey(): string {
    return this._matchKey;
  }

  set matchKey(value: string) {
    this._matchKey = value;
  }

  get teamKey(): number {
    return this._teamKey;
  }

  set teamKey(value: number) {
    this._teamKey = value;
  }

  get station(): number {
    return this._station;
  }

  set station(value: number) {
    this._station = value;
  }

  get stationStatus(): number {
    return this._stationStatus;
  }

  set stationStatus(value: number) {
    this._stationStatus = value;
  }

  get refStatus(): number {
    return this._refStatus;
  }

  set refStatus(value: number) {
    this._refStatus = value;
  }

  get team(): Team {
    return this._team;
  }

  set team(value: Team) {
    this._team = value;
  }
}
