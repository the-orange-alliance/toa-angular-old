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

        let contains_number = (team_number.indexOf(query) > -1);
        let contains_name = (team_name.indexOf(query) > -1);

        return contains_number || contains_name;
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
