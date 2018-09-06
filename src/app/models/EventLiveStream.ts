import { SafeResourceUrl } from "@angular/platform-browser";

export default class EventLiveStream implements ISerializable {
  private _streamKey: string;
  private _eventKey: string;
  private _streamType: number;
  private _isActive: boolean;
  private _streamURL: string;

  private _safeURL: SafeResourceUrl;

  constructor() {
    this._streamKey = "";
    this._eventKey = "";
    this._streamType = 0;
    this._isActive = false;
    this._streamURL = "";
  }

  toJSON(): object {
    return {
      stream_key: this.streamKey,
      event_key: this.eventKey,
      stream_type: this.streamType,
      is_active: this.isActive,
      url: this.streamURL
    };
  }

  fromJSON(json: any): EventLiveStream {
    const stream: EventLiveStream = new EventLiveStream();
    stream.streamKey = json.stream_key;
    stream.eventKey = json.event_key;
    stream.streamType = json.stream_type;
    stream.isActive = json.is_active;
    stream.streamURL = json.url;
    return stream;
  }

  get streamKey(): string {
    return this._streamKey;
  }

  set streamKey(value: string) {
    this._streamKey = value;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get streamType(): number {
    return this._streamType;
  }

  set streamType(value: number) {
    this._streamType = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get streamURL(): string {
    return this._streamURL;
  }

  set streamURL(value: string) {
    this._streamURL = value;
  }
  
  get safeURL(): SafeResourceUrl {
    return this._safeURL;
  }

  set safeURL(value: SafeResourceUrl) {
    this._safeURL = value;
  }
}