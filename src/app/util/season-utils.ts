/**
 * Created by Kyle Flynn on 7/28/2017.
 */
export class SeasonParser {

  season_data: any;

  constructor(season_data: any) {
    this.season_data = season_data;
  }

  public toString(): string {
    let season_id = this.season_data.season_key.toString();
    let season_one = season_id.substring(0, 2);
    let season_two = season_id.substring(2, 4);
    return "20" + season_one + "/20" + season_two + " " + this.season_data.season_desc;
  }

}
