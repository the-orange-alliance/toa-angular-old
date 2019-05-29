import { ISerializable } from './ISerializable';
import Event from './Event';

export default class ModifiedEvent implements ISerializable {
  private _newEvent: Event;
  private _originalEvent: Event;
  private _discStartDate: boolean;
  private _discEndDate: boolean;
  private _discVenue: boolean;
  private _discCity: boolean;
  private _discState: boolean;
  private _discCountry: boolean;
  private _discWebsite: boolean;

  constructor() {
    this._newEvent = new Event();
    this._originalEvent = new Event();
    this._discStartDate = false;
    this._discEndDate = false;
    this._discVenue = false;
    this._discCity = false;
    this._discState = false;
    this._discCountry = false;
    this._discWebsite = false;
  }

  toJSON(): object {
    return this.newEvent.toJSON();
  }

  fromJSON(json: any): ModifiedEvent {
    const event: ModifiedEvent = new ModifiedEvent();
    event.newEvent = new Event().fromJSON(json);
    event.originalEvent = new Event().fromJSON(json.toa);
    event.discStartDate = json.discrepencies.start_date;
    event.discEndDate = json.discrepencies.end_date;
    event.discVenue = json.discrepencies.venue;
    event.discCity = json.discrepencies.city;
    event.discState = json.discrepencies.state_prov;
    event.discCountry = json.discrepencies.country;
    event.discWebsite = json.discrepencies.website;
    return event;
  }

  get newEvent(): Event {
    return this._newEvent;
  }

  set newEvent(value: Event) {
    this._newEvent = value;
  }

  get originalEvent(): Event {
    return this._originalEvent;
  }

  set originalEvent(value: Event) {
    this._originalEvent = value;
  }

  get discStartDate(): boolean {
    return this._discStartDate;
  }

  set discStartDate(value: boolean) {
    this._discStartDate = value;
  }

  get discEndDate(): boolean {
    return this._discEndDate;
  }

  set discEndDate(value: boolean) {
    this._discEndDate = value;
  }

  get discVenue(): boolean {
    return this._discVenue;
  }

  set discVenue(value: boolean) {
    this._discVenue = value;
  }

  get discCity(): boolean {
    return this._discCity;
  }

  set discCity(value: boolean) {
    this._discCity = value;
  }

  get discState(): boolean {
    return this._discState;
  }

  set discState(value: boolean) {
    this._discState = value;
  }

  get discCountry(): boolean {
    return this._discCountry;
  }

  set discCountry(value: boolean) {
    this._discCountry = value;
  }

  get discWebsite(): boolean {
    return this._discWebsite;
  }

  set discWebsite(value: boolean) {
    this._discWebsite = value;
  }
}
