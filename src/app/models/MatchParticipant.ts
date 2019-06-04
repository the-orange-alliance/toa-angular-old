import { ISerializable } from './ISerializable';

export default class MatchParticipant implements ISerializable {
 private _matchParticipantKey: string;
 private _matchKey: string;
 private _teamKey: string;
 private _teamNumber: number;
 private _station: number;
 private _stationStatus: number;
 private _refStatus: number;

 constructor() {
   this._matchParticipantKey = '';
   this._matchKey = '';
   this._teamKey = '';
   this._teamNumber = -1;
   this._station = 0;
   this._stationStatus = 0;
   this._refStatus = 0;
 }

 toJSON(): object {
   return {
     match_participant_key: this.matchParticipantKey,
     match_key: this.matchKey,
     team_key: this.teamKey,
     team_number: this.teamNumber,
     station: this.station,
     station_status: this.stationStatus,
     ref_status: this.refStatus
   };
 }

 fromJSON(json: any): MatchParticipant {
   const participant: MatchParticipant = new MatchParticipant();
   participant.matchParticipantKey = json.match_participant_key;
   participant.matchKey = json.match_key;
   participant.teamKey = json.team_key;
   participant.teamNumber = json.team_number;
   participant.station = json.station;
   participant.stationStatus = json.station_status;
   participant.refStatus = json.ref_status;
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

  get teamKey(): string {
    return this._teamKey;
  }

  set teamKey(value: string) {
    this._teamKey = value;
  }

  get teamNumber(): number {
    return this._teamNumber;
  }

  set teamNumber(value: number) {
    this._teamNumber = value;
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
}
