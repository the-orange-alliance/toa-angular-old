import Event from '../models/Event';

export class EventParser {

  event_data: any;
  private radix = 10;

  constructor(event_data: any) {
    this.event_data = event_data;
  }

  getSeasonID(): string {
    return this.event_data.event_key.toString().split('-')[0];
  }

  getRegionID(): string {
    return this.event_data.event_key.toString().split('-')[1];
  }

  getEventCode(): string {
    const split = this.event_data.event_key.toString().split('-');
    return this.event_data.event_key.toString().split('-')[2];
  }

  hasDivision(): boolean {
    const event_id = this.getEventCode();
    return !isNaN(parseInt(event_id.substring(event_id.length - 1, event_id.length), this.radix));
  }

  getDivisionID(): number {
    if (this.hasDivision()) {
      const event_id = this.getEventCode();
      return parseInt(event_id.substring(event_id.length - 1, event_id.length), this.radix);
    } else {
      return -1;
    }
  }

}

export class EventFilter {

  private events: Event[];
  private eventsFiltered: Event[];

  constructor(events: any) {
    this.events = events;
  }

  public filterArray(query: string) {
    if (query && query.trim() !== '' && query !== null) {
      this.eventsFiltered = this.events.filter((event: Event) => {
        return (event.regionKey || 'null').toLowerCase() === query.toLowerCase();
      });
    } else {
      this.eventsFiltered = this.events;
    }
  }

  public searchFilter(query: string) {
    if (query && query.trim() !== '' && query !== null) {
      this.eventsFiltered = this.events.filter((event) => {
        query = query.toLowerCase();

        const event_region = (event.regionKey || 'null').toLowerCase();
        const event_city = (event.city + '' || 'null').toLowerCase();
        const event_state_prov = (event.stateProv + '' || 'null').toLowerCase();
        const event_country = (event.country + '' || 'null').toLowerCase();
        const event_name = (event.eventName || 'null').toLowerCase();
        const event_key = (event.eventKey || 'null').toLowerCase();

        const contains_region = (event_region.indexOf(query) > -1);
        const contains_city = (event_city.indexOf(query) > -1);
        const contains_state_prov = (event_state_prov.indexOf(query) > -1);
        const contains_country = (event_country.indexOf(query) > -1);
        const contains_name = (event_name.indexOf(query) > -1);
        const some_key = event_key === query;

        return contains_region || contains_city || contains_state_prov || contains_country || contains_name || some_key;
      });
    } else {
      this.eventsFiltered = this.events;
    }
    this.eventsFiltered.sort((a: Event, b: Event) => {
      return (new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    });
  }

  public getOriginalArray() {
    return this.events;
  }

  public getFilteredArray() {
    return this.eventsFiltered;
  }

}

export class EventSorter {

  public sort(items: Event[]) {
    items.sort(function (a, b) {
      let date1 = new Date(a.startDate);
      let date2 = new Date(b.startDate);
      return (date1 > date2) ? 1 : ((date2 > date1) ? -1 : 0);
    });
    return items;
  }
}
