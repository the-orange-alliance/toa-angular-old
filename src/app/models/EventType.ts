import { ISerializable } from './ISerializable';

export default class EventType implements ISerializable {
  private _eventTypeKey: string;
  private _description: string;

  constructor() {
    this._eventTypeKey = '';
    this._description = '';
  }

  toJSON(): object {
    return {
      event_type_key: this.eventTypeKey,
      description: this.description
    };
  }

  fromJSON(json: any): EventType {
    const eventType: EventType = new EventType();
    eventType.eventTypeKey = json.event_type_key;
    eventType.description = json.description;
    return eventType;
  }

  get eventTypeKey(): string {
    return this._eventTypeKey;
  }

  set eventTypeKey(value: string) {
    this._eventTypeKey = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
