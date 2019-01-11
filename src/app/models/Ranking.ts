export default class Ranking implements ISerializable {
  private _rankKey: string;
  private _eventKey: string;
  private _teamKey: number;
  private _rank: number;
  private _rankChange: number;
  private _wins: number;
  private _losses: number;
  private _ties: number;
  private _highestQualScore: number;
  private _rankingPoints: number;
  private _qualifyingPoints: number;
  private _tieBreakerPoints: number;
  private _disqualified: number;
  private _played: number;

  constructor() {
    this._rankKey = '';
    this._eventKey = '';
    this._teamKey = 0;
    this._rank = 0;
    this._rankChange = 0;
    this._wins = 0;
    this._losses = 0;
    this._ties = 0;
    this._highestQualScore = 0;
    this._rankingPoints = 0;
    this._qualifyingPoints = 0;
    this._tieBreakerPoints = 0;
    this._disqualified = 0;
    this._played = 0;
  }

  public toJSON(): object {
    return {
      rank_key: this.rankKey,
      event_key: this.eventKey,
      team_key: this.teamKey,
      rank: this.rank,
      rank_change: this.rankChange,
      wins: this.wins,
      losses: this.losses,
      ties: this.ties,
      highest_qual_score: this.highestQualScore,
      ranking_points: this.rankingPoints,
      qualifying_points: this.qualifyingPoints,
      tie_breaker_points: this.tieBreakerPoints,
      disqualified: this.disqualified,
      played: this.played
    };
  }

  public fromJSON(json: any): Ranking {
    const ranking: Ranking = new Ranking();
    ranking.rankKey = json.rank_key;
    ranking.eventKey = json.event_key;
    ranking.teamKey = json.team_key;
    ranking.rank = json.rank;
    ranking.rankChange = json.rank_change;
    ranking.wins = json.wins;
    ranking.losses = json.losses;
    ranking.ties = json.ties;
    ranking.highestQualScore = json.highest_qual_score;
    ranking.rankingPoints = json.ranking_points;
    ranking.qualifyingPoints = json.qualifying_points;
    ranking.tieBreakerPoints = json.tie_breaker_points;
    ranking.disqualified = json.disqualified;
    ranking.played = json.played;
    return ranking;
  }

  get rankKey(): string {
    return this._rankKey;
  }

  set rankKey(value: string) {
    this._rankKey = value;
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

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }

  get rankChange(): number {
    return this._rankChange;
  }

  set rankChange(value: number) {
    this._rankChange = value;
  }

  get wins(): number {
    return this._wins;
  }

  set wins(value: number) {
    this._wins = value;
  }

  get losses(): number {
    return this._losses;
  }

  set losses(value: number) {
    this._losses = value;
  }

  get ties(): number {
    return this._ties;
  }

  set ties(value: number) {
    this._ties = value;
  }

  get highestQualScore(): number {
    return this._highestQualScore;
  }

  set highestQualScore(value: number) {
    this._highestQualScore = value;
  }

  get rankingPoints(): number {
    return this._rankingPoints;
  }

  set rankingPoints(value: number) {
    this._rankingPoints = value;
  }

  get qualifyingPoints(): number {
    return this._qualifyingPoints;
  }

  set qualifyingPoints(value: number) {
    this._qualifyingPoints = value;
  }

  get tieBreakerPoints(): number {
    return this._tieBreakerPoints;

  }

  set tieBreakerPoints(value: number) {
    this._tieBreakerPoints = value;
  }


  get disqualified(): number {
    return this._disqualified;
  }

  set disqualified(value: number) {
    this._disqualified = value;
  }

  get played(): number {
    return this._played;
  }

  set played(value: number) {
    this._played = value;
  }
}
