/**
 * Created by Kyle Flynn on 7/21/2017.
 */
export class EventParser {

  event_data: any;

  constructor(event_data: any) {
    this.event_data = event_data;
  }

  getSeasonID(): string {
    return this.event_data.event_key.toString().split("-")[0];
  }

  getRegionID(): string {
    return this.event_data.event_key.toString().split("-")[1];
  }

  getEventCode(): string {
    let split = this.event_data.event_key.toString().split("-");
    return this.event_data.event_key.toString().split("-")[2];
  }

  hasDivision(): boolean {
    let event_id = this.getEventCode();
    return !isNaN(parseInt(event_id.substring(event_id.length - 1, event_id.length)));
  }

}

export class EventFilter {

  private events: any;
  private events_filtered: any;

  constructor(events: any) {
    this.events = events;
  }

  public filterArray(query: string) {
    if (query && query.trim() != '' && query != null) {
      this.events_filtered = this.events.filter((event) => {
        query = query.toLowerCase();
        let region = (event.region_key || "null").toLowerCase();

        let contains_region = (region.indexOf(query) > -1);

        return contains_region;
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
    let pivotValue = items[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
      // -1 means items[i] < pivotValue, 1 means items[i] > pivotValue
      if (items[i].start_date < pivotValue.start_date || new EventParser(pivotValue).hasDivision()) {
        this.swap(items, i, partitionIndex);
        partitionIndex++;
      }
    }
    this.swap(items, right, partitionIndex);
    return partitionIndex;
  }

  private swap(items, index1, index2) {
    let temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
  }

}
