import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TeamFilter } from '../../util/team-utils';

const TEAMS_PER_PAGE = 500;

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  providers: [FTCDatabase]
})
export class TeamsComponent implements OnInit {

  teams: any[];
  teams_count: number;
  teams_filter: TeamFilter;

  pages: any[];
  cur_page: number;

  regions: any;
  leagues: any;

  location_query: string;
  team_query: string;

  current_region: any;
  current_league: any;

  constructor(private router: Router, private ftc: FTCDatabase) {
    this.regions = [];
    this.leagues = [];

    this.location_query = null;
    this.team_query = null;
  }

  ngOnInit(): void {
    this.ftc.getAllTeams().subscribe((data) => {
      this.teams_count = data[0].TeamsCount;
      this.pages = [];
      for (let i = 0; i < Math.ceil(this.teams_count / TEAMS_PER_PAGE); i++) {
        this.pages.push({ index: (i) });
      }
      this.getTeams(0);
    }, (err) => {
      console.log(err);
    });

    this.ftc.getAllRegions().subscribe( (data) => {
      this.regions = data;
      this.regions.push({ region_key: 'All Regions' });
      this.current_region = this.regions[this.regions.length - 1];
    }, (err) => {
      console.log(err);
    });

    this.ftc.getAllLeagues().subscribe( (data) => {
      this.leagues = data;
      this.leagues.push({ league_key: 'All Leagues' });
      this.current_league = this.leagues[this.leagues.length - 1];
    }, (err) => {
      console.log(err);
    });
  }

  openTeam(team_number): void {
    this.router.navigate(['/teams', team_number]);
  }

  getTeams(page_index): void {
    if (page_index > this.pages.length - 1) {
      this.cur_page = this.pages.length - 1;
    } else if (page_index <= 0) {
      this.cur_page = 0;
    } else {
      this.cur_page = page_index;
    }
    this.ftc.getTeams(this.cur_page * TEAMS_PER_PAGE).subscribe((data) => {
      this.teams = data;
      this.teams_filter = new TeamFilter(this.teams);
    }, (err) => {
      console.log(err);
    });
  }

  incIndex() {
    return this.cur_page + 1;
  }

  decIndex() {
    return this.cur_page - 1;
  }

  selectRegion(region: any) {
    if (this.current_region.region_key !== region.region_key) {
      this.current_region = region;
      if (this.current_region.region_desc) {
        this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
        this.teams = this.teams_filter.getFilteredArray();
      } else {
        this.teams = this.teams_filter.getOriginalArray();
      }
    }
  }

  selectLeague(league: any) {
    if (this.current_league.region_key !== league.league_key) {
      this.current_league = league;
      if (this.current_league.league_desc) {
        this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
        this.teams = this.teams_filter.getFilteredArray();
      } else {
        this.teams = this.teams_filter.getOriginalArray();
      }
    }
  }

  queryTeam() {
    if (this.team_query !== null && this.team_query.length > 0) {
      this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
      this.teams = this.teams_filter.getFilteredArray();
    } else {
      this.teams = this.teams_filter.getOriginalArray();
    }
  }

  queryLocation() {
    if (this.location_query !== null && this.location_query.length > 0) {
      this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
      this.teams = this.teams_filter.getFilteredArray();
    } else {
      this.teams = this.teams_filter.getOriginalArray();
    }
  }

  clearFilter() {
    this.current_league = this.leagues[this.leagues.length - 1];
    this.current_region = this.regions[this.regions.length - 1];
    this.team_query = null;
    this.location_query = null;
    this.teams = this.teams_filter.getOriginalArray();
  }

}
