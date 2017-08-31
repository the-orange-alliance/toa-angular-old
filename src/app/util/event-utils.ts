/**
 * Created by Kyle Flynn on 7/21/2017.
 */
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

  private events: any;
  private events_filtered: any;

  constructor(events: any) {
    this.events = events;
  }

  public filterArray(query: string) {
    if (query && query.trim() !== '' && query !== null) {
      this.events_filtered = this.events.filter((event) => {
        query = query.toLowerCase();
        const region = (event.region_key || 'null').toLowerCase();

        const contains_region = (region.indexOf(query) > -1);

        return contains_region;
      });
    } else {
      this.events_filtered = this.events;
    }
  }

  public searchFilter(query: string) {
    if (query && query.trim() !== '' && query !== null) {
      this.events_filtered = this.events.filter((event) => {
        query = query.toLowerCase();

        const event_region = (event.region_key || 'null').toLowerCase();
        const event_city = (event.city + '' || 'null').toLowerCase();
        const event_state_prov = (event.state_prov + '' || 'null').toLowerCase();
        const event_country = (event.country + '' || 'null').toLowerCase();
        const event_name = (event.event_name || "null").toLowerCase();

        const contains_region = (event_region.indexOf(query) > -1);
        const contains_city = (event_city.indexOf(query) > -1);
        const contains_state_prov = (event_state_prov.indexOf(query) > -1);
        const contains_country = (event_country.indexOf(query) > -1);
        const contains_name = (event_name.indexOf(query) > -1);

        return contains_region || contains_city || contains_state_prov || contains_country || contains_name;
      });
    } else {
      this.events_filtered = this.events;
    }
  }

  public getOriginalArray() {
    return this.events;
  }

  public getFilteredArray() {
    return this.events_filtered;
  }

}

export class EventSorter {

  constructor() {}

  public sort(items, left, right) {
    let pivot, partitionIndex;

    if (left < right) {
      pivot = right;
      partitionIndex = this.partition(items, pivot, left, right);

      this.sort(items, left, partitionIndex - 1);
      this.sort(items, partitionIndex + 1, right);
    }

    return items;
  }

  private partition(items, pivot, left, right) {
    const pivotValue = items[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
      // -1 means items[i] < pivotValue, 1 means items[i] > pivotValue
      if (items[i].start_date < pivotValue.start_date || new EventParser(pivotValue).getDivisionID() === 0) {
        this.swap(items, i, partitionIndex);
        partitionIndex++;
      }
    }
    this.swap(items, right, partitionIndex);
    return partitionIndex;
  }

  private swap(items, index1, index2) {
    const temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
  }

}
