import { ISerializable } from './ISerializable';

export default class Media implements ISerializable {
  private _mediaKey: string;
  private _eventKey: string;
  private _teamKey: string;
  private _mediaType: number;
  private _isPrimary: boolean;
  private _mediaTitle: string;
  private _mediaLink: string;

/*

  Media Types:
  0 - GitHub Repo/Profile
  1 - CAD Design
  2 - Engineering Notebook
  3 - Robot Reveal
  4 - Image

*/

    constructor() {
    this._mediaKey = '';
    this._eventKey = '';
    this._teamKey = '';
    this._mediaType = -1;
    this._isPrimary = false;
    this._mediaTitle = '';
    this._mediaLink = '';
  }

  toJSON(): object {
    return {
      media_key: this.mediaKey,
      event_key: this.eventKey,
      team_key: this.teamKey,
      media_type: this.mediaType,
      is_primary: this.isPrimary,
      title: this.mediaTitle,
      link: this.mediaLink
    };
  }

  fromJSON(json: any): Media {
    const award: Media = new Media();
    award.mediaKey = json.media_key;
    award.eventKey = json.event_key;
    award.teamKey = json.team_key;
    award.mediaType = json.media_type;
    award.isPrimary = json.is_primary;
    award.mediaTitle = json.title;
    award.mediaLink = json.link;
    return award;
  }

  get mediaKey(): string {
    return this._mediaKey;
  }

  set mediaKey(value: string) {
    this._mediaKey = value;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get teamKey(): string {
    return this._teamKey;
  }

  set teamKey(value: string) {
    this._teamKey = value;
  }

  get mediaType(): number {
    return this._mediaType;
  }

  set mediaType(value: number) {
    this._mediaType = value;
  }

  get isPrimary(): boolean {
    return this._isPrimary;
  }

  set isPrimary(value: boolean) {
    this._isPrimary = value;
  }

  get mediaTitle(): string {
    return this._mediaTitle;
  }

  set mediaTitle(value: string) {
    this._mediaTitle = value;
  }

  get mediaLink(): string {
    return this._mediaLink;
  }

  set mediaLink(value: string) {
    this._mediaLink = value;
  }
}
