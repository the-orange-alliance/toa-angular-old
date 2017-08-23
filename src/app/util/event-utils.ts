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
