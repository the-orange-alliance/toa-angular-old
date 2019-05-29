import { ISerializable } from './ISerializable';

export default class WebAnnouncement implements ISerializable {
  private _announcementKey: string;
  private _title: string;
  private _publishDate: string;
  private _isActive: boolean;
  private _text: string;
  private _author: string;

  constructor() {
    this._announcementKey = '';
    this._title = '';
    this._publishDate = '';
    this._isActive = false;
    this._text = '';
    this._author = '';
  }

  toJSON(): object {
    return {
      announcement_key: this.announcementKey,
      title: this.title,
      publish_date: this.publishDate,
      is_active: this.isActive,
      text: this.text,
      author: this.author
    };
  }

  fromJSON(json: any): WebAnnouncement {
    const announcement: WebAnnouncement = new WebAnnouncement();
    announcement.announcementKey = json.announcement_key;
    announcement.title = json.title;
    announcement.publishDate = json.publish_date;
    announcement.isActive = json.is_active;
    announcement.text = json.text;
    announcement.author = json.author;
    return announcement;
  }

  get announcementKey(): string {
    return this._announcementKey;
  }

  set announcementKey(value: string) {
    this._announcementKey = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get publishDate(): string {
    return this._publishDate;
  }

  set publishDate(value: string) {
    this._publishDate = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }
}
