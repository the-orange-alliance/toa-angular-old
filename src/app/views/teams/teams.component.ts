import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TeamFilter } from '../../util/team-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';


const TEAMS_PER_PAGE = 500;

@Component({
  selector: 'toa-teams',
  templateUrl: './teams.component.html',
  providers: [FTCDatabase,TheOrangeAllianceGlobals]
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
  current_teams: any;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa:TheOrangeAllianceGlobals) {
    this.regions = [];
    this.leagues = [];

    this.location_query = null;
    this.team_query = null;
    this.globaltoa.setTitle("Teams");
  }

  ngOnInit(): void {
    this.ftc.getAllTeams().subscribe((data) => {
      this.teams_count = data[0].team_count;
      this.pages = [];
      for (let i = 0; i < Math.ceil(this.teams_count / TEAMS_PER_PAGE); i++) {
        this.pages.push({ index: (i) });
      }
      this.getAllTeams();
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

  getAllTeams(): void {
    this.ftc.getEveryTeam().subscribe((data) => {
      this.teams = data;
      this.teams_filter = new TeamFilter(this.teams);
      this.getTeams(0);
    }, (err) => {
      console.log(err);
    });
  }

  getTeams(page_index): void {
    if (page_index > this.pages.length - 1) {
      this.cur_page = this.pages.length - 1;
    } else if (page_index <= 0) {
      this.cur_page = 0;
    } else {
      this.cur_page = page_index;
    }
    this.current_teams = this.teams.slice((this.cur_page * TEAMS_PER_PAGE), ((this.cur_page + 1) * TEAMS_PER_PAGE));
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
      if (this.current_region.description) {
        this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
        this.current_teams = this.teams_filter.getFilteredArray();
      } else {
        this.current_teams = this.teams.slice((this.cur_page * TEAMS_PER_PAGE), ((this.cur_page + 1) * TEAMS_PER_PAGE));
      }
    }
  }

  selectLeague(league: any) {
    if (this.current_league.region_key !== league.league_key) {
      this.current_league = league;
      if (this.current_league.description) {
        this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
        this.current_teams = this.teams_filter.getFilteredArray();
      } else {
        this.current_teams = this.teams.slice((this.cur_page * TEAMS_PER_PAGE), ((this.cur_page + 1) * TEAMS_PER_PAGE));
      }
    }
  }

  queryTeam() {
    if (this.team_query !== null && this.team_query.length > 0) {
      this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
      this.current_teams = this.teams_filter.getFilteredArray();
    } else {
      this.current_teams = this.teams.slice((this.cur_page * TEAMS_PER_PAGE), ((this.cur_page + 1) * TEAMS_PER_PAGE));
    }
  }

  queryLocation() {
    if (this.location_query !== null && this.location_query.length > 0) {
      this.teams_filter.filterArray(this.current_region.region_key, this.team_query, this.location_query, this.current_league.league_key);
      this.current_teams = this.teams_filter.getFilteredArray();
    } else {
      this.current_teams = this.teams.slice((this.cur_page * TEAMS_PER_PAGE), ((this.cur_page + 1) * TEAMS_PER_PAGE));
    }
  }

  clearFilter() {
    this.current_league = this.leagues[this.leagues.length - 1];
    this.current_region = this.regions[this.regions.length - 1];
    this.team_query = null;
    this.location_query = null;
    this.current_teams = this.teams.slice((this.cur_page * TEAMS_PER_PAGE), ((this.cur_page + 1) * TEAMS_PER_PAGE));
  }
  clickToTeam(number) {
    window.location.href = "/teams/" + number;
  }
}
