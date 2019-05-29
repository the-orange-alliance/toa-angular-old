import { ISerializable } from './ISerializable';
import MatchDetails from './MatchDetails';
import MatchParticipant from './MatchParticipant';
import Event from './Event';

export default class Match implements ISerializable {
  private _matchKey: string;
  private _eventKey: string;
  private _tournamentLevel: number;
  private _scheduledTime: string;
  private _matchName: string;
  private _playNumber: number;
  private _fieldNumber: number;
  private _prestartTime: string;
  private _prestartCount: number;
  private _cycleTime: string;
  private _redScore: number;
  private _blueScore: number;
  private _redPenalty: number;
  private _bluePenalty: number;
  private _redAutoScore: number;
  private _blueAutoScore: number;
  private _redTeleScore: number;
  private _blueTeleScore: number;
  private _redEndScore: number;
  private _blueEndScore: number;
  private _videoURL: string;

  private _event: Event;
  private _matchDetails: MatchDetails;
  private _matchParticipants: MatchParticipant[];

  constructor() {
    this._matchKey = '';
    this._eventKey = '';
    this._tournamentLevel = 0;
    this._scheduledTime = '';
    this._matchName = '';
    this._playNumber = 0;
    this._fieldNumber = 0;
    this._prestartTime = '';
    this._prestartCount = 0;
    this._cycleTime = '';
    this._redScore = 0;
    this._blueScore = 0;
    this._redPenalty = 0;
    this._bluePenalty = 0;
    this._redAutoScore = 0;
    this._blueAutoScore = 0;
    this._redEndScore = 0;
    this._blueEndScore = 0;
    this._redTeleScore = 0;
    this._blueTeleScore = 0;
    this._videoURL = '';

    this._matchParticipants = [];
  }

  toJSON(): object {
    return {
      match_key: this.matchKey,
      event_key: this.eventKey,
      tournament_level: this.tournamentLevel,
      scheduled_time: this.scheduledTime,
      match_name: this.matchName,
      play_number: this.playNumber,
      field_number: this.fieldNumber,
      prestart_time: this.prestartTime,
      prestart_count: this.prestartCount,
      cycle_time: this.cycleTime,
      red_score: this.redScore,
      blue_score: this.blueScore,
      red_penalty: this.redPenalty,
      blue_penalty: this.bluePenalty,
      red_auto_score: this.redAutoScore,
      blue_auto_score: this.blueAutoScore,
      red_tele_score: this.redTeleScore,
      blue_tele_score: this.blueTeleScore,
      red_end_score: this.redEndScore,
      blue_end_score: this.blueEndScore,
      video_url: this.videoURL
    };
  }

  fromJSON(json: any): Match {
    const match: Match = new Match();
    match.matchKey = json.match_key;
    match.eventKey = json.event_key;
    match.tournamentLevel = json.tournament_level;
    match.scheduledTime = json.scheduled_time;
    match.matchName = json.match_name;
    match.playNumber = json.play_number;
    match.fieldNumber = json.field_number;
    match.prestartTime = json.prestart_time;
    match.prestartCount = json.prestart_count;
    match.cycleTime = json.cycle_time;
    match.redScore = json.red_score;
    match.blueScore = json.blue_score;
    match.redPenalty = json.red_penalty;
    match.bluePenalty = json.blue_penalty;
    match.redAutoScore = json.red_auto_score;
    match.blueAutoScore = json.blue_auto_score;
    match.redTeleScore = json.red_tele_score;
    match.blueTeleScore = json.blue_tele_score;
    match.redEndScore = json.red_end_score;
    match.blueEndScore = json.blue_end_score;
    match.videoURL = json.video_url;
    match.participants = typeof json.participants !== 'undefined' ? json.participants.map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON)) : []
    return match;
  }


  public getShortName(): string {
    switch (this.tournamentLevel) {
      case 0:
        return 'Practice Match';
      case 1:
        return 'Qualification Match';
      case 21:
        return 'Quarterfinal Match';
      case 22:
        return 'Quarterfinal Match';
      case 23:
        return 'Quarterfinal Match';
      case 24:
        return 'Quarterfinal Match';
      case 31:
        return 'Semifinals Match';
      case 32:
        return 'Semifinals Match';
      case 4:
        return 'Finals Match';
      default:
        return 'Match';
    }
  }

  get matchKey(): string {
    return this._matchKey;
  }

  set matchKey(value: string) {
    this._matchKey = value;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get tournamentLevel(): number {
    return this._tournamentLevel;
  }

  set tournamentLevel(value: number) {
    this._tournamentLevel = value;
  }

  get scheduledTime(): string {
    return this._scheduledTime;
  }

  set scheduledTime(value: string) {
    this._scheduledTime = value;
  }

  get matchName(): string {
    return this._matchName;
  }

  set matchName(value: string) {
    this._matchName = value;
  }

  get playNumber(): number {
    return this._playNumber;
  }

  set playNumber(value: number) {
    this._playNumber = value;
  }

  get fieldNumber(): number {
    return this._fieldNumber;
  }

  set fieldNumber(value: number) {
    this._fieldNumber = value;
  }

  get prestartTime(): string {
    return this._prestartTime;
  }

  set prestartTime(value: string) {
    this._prestartTime = value;
  }

  get prestartCount(): number {
    return this._prestartCount;
  }

  set prestartCount(value: number) {
    this._prestartCount = value;
  }

  get cycleTime(): string {
    return this._cycleTime;
  }

  set cycleTime(value: string) {
    this._cycleTime = value;
  }

  get redScore(): number {
    return this._redScore;
  }

  set redScore(value: number) {
    this._redScore = value;
  }

  get blueScore(): number {
    return this._blueScore;
  }

  set blueScore(value: number) {
    this._blueScore = value;
  }

  get redPenalty(): number {
    return this._redPenalty;
  }

  set redPenalty(value: number) {
    this._redPenalty = value;
  }

  get bluePenalty(): number {
    return this._bluePenalty;
  }

  set bluePenalty(value: number) {
    this._bluePenalty = value;
  }

  get redAutoScore(): number {
    return this._redAutoScore;
  }

  set redAutoScore(value: number) {
    this._redAutoScore = value;
  }

  get blueAutoScore(): number {
    return this._blueAutoScore;
  }

  set blueAutoScore(value: number) {
    this._blueAutoScore = value;
  }

  get redTeleScore(): number {
    return this._redTeleScore;
  }

  set redTeleScore(value: number) {
    this._redTeleScore = value;
  }

  get blueTeleScore(): number {
    return this._blueTeleScore;
  }

  set blueTeleScore(value: number) {
    this._blueTeleScore = value;
  }

  get redEndScore(): number {
    return this._redEndScore;
  }

  set redEndScore(value: number) {
    this._redEndScore = value;
  }

  get blueEndScore(): number {
    return this._blueEndScore;
  }

  set blueEndScore(value: number) {
    this._blueEndScore = value;
  }

  get videoURL(): string {
    return this._videoURL;
  }

  set videoURL(value: string) {
    this._videoURL = value;
  }

  get details(): MatchDetails {
    return this._matchDetails;
  }

  set details(value: MatchDetails) {
    this._matchDetails = value;
  }

  get participants(): MatchParticipant[] {
    return this._matchParticipants;
  }

  set participants(value: MatchParticipant[]) {
    this._matchParticipants = value;
  }

  get event(): Event {
    return this._event;
  }

  set event(value: Event) {
    this._event = value;
  }
}
