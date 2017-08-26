/**
 * Created by Kyle Flynn on 7/30/2017.
 */
export class TeamFilter {

  private teams: any;
  private teams_filtered: any;

  constructor(teams: any) {
    this.teams = teams;
  }

  public filterArray(query: string) {
    if (query && query.trim() != '' && query != null) {
      this.teams_filtered = this.teams.filter((team) => {
        query = query.toLowerCase();

        let team_number = (team.team_number + "" || "null").toLowerCase();
        let team_name = (team.team_name_long + "" || "null").toLowerCase();
        let team_region = (team.region_key + "" || "null").toLowerCase();
        let team_league = (team.league_key + "" || "null").toLowerCase();
        let team_city = (team.city + "" || "null").toLowerCase();
        let team_state_prov = (team.state_prov + "" || "null").toLowerCase();
        let team_country = (team.country + "" || "null").toLowerCase();

        let contains_number = (team_number.indexOf(query) > -1);
        let contains_name = (team_name.indexOf(query) > -1);
        let contains_region = (team_region.indexOf(query) > -1);
        let contains_league = (team_league.indexOf(query) > -1);
        let contains_city = (team_city.indexOf(query) > -1);
        let contains_state_prov = (team_state_prov.indexOf(query) > -1);
        let contains_country = (team_country.indexOf(query) > -1);

        return contains_number || contains_name || contains_region || contains_league || contains_city || contains_state_prov || contains_country;
      });
    } else {
      this.teams_filtered = this.teams;
    }
  }

  public getOriginalArray() {
    return this.teams;
  }

  public getFilteredArray() {
    return this.teams_filtered;
  }

}

export class TeamSorter {

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
      if (items[i].team_number < pivotValue.team_number) {
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
