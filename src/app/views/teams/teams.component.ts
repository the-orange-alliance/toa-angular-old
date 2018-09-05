import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TeamFilter } from '../../util/team-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import Team from '../../models/Team';
import League from '../../models/League';
import Region from '../../models/Region';

const TEAMS_PER_PAGE = 400;

@Component({
  selector: 'toa-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [FTCDatabase,TheOrangeAllianceGlobals]
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  teamsFilter: TeamFilter;

  pages: any[];
  currentPage: number;

  regions: Region[];
  leagues: League[];

  locationQuery: string;
  teamQuery: string;

  currentRegion: Region;
  currentLeague: League;
  currentTeams: Team[];

  constructor(private router: Router, private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals) {
    this.regions = [];
    this.leagues = [];

    this.locationQuery = null;
    this.teamQuery = null;
    this.app.setTitle('Teams');
  }

  ngOnInit(): void {
    this.ftc.getAllTeams().then((data: Team[]) => {
      this.teams = data;
      this.teamsFilter = new TeamFilter(this.teams);
      this.updateNagivationBars();
      this.getTeams(0);
      const $get = this.app.retrieveGET();
      if ('q' in $get) {
        this.teamQuery = $get['q'];
        this.queryTeam();
      }
    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      const allRegions = new Region();
      allRegions.regionKey = "ALL";
      allRegions.description = "All Regions";
      this.regions = data;
      this.regions.push(allRegions);
      this.currentRegion = this.regions[this.regions.length - 1];
    });

    this.ftc.getAllLeagues().then((data: League[]) => {
      const allLeagues = new League();
      allLeagues.leagueKey = "ALL";
      allLeagues.description = "All Leagues";
      this.leagues = data;
      this.leagues.push(allLeagues);
      this.currentLeague = this.leagues[this.leagues.length - 1];
    });
  }

  updateNagivationBars() {
    this.pages = [];
    for (let i = 0; i < Math.ceil(this.teams.length / TEAMS_PER_PAGE); i++) {
      this.pages.push({ index: (i) });
    }
  }

  openTeam(team_number): void {
    this.router.navigate(['/teams', team_number]);
  }

  getTeams(pageIndex: number): void {
    if (pageIndex > this.pages.length - 1) {
      this.currentPage = this.pages.length - 1;
    } else if (pageIndex <= 0) {
      this.currentPage = 0;
    } else {
      this.currentPage = pageIndex;
    }
    this.currentTeams = this.teams.slice((this.currentPage * TEAMS_PER_PAGE), ((this.currentPage + 1) * TEAMS_PER_PAGE));
  }

  incIndex() {
    return this.currentPage + 1;
  }

  decIndex() {
    return this.currentPage - 1;
  }

  selectRegion(region: Region) {
    if (this.currentRegion.regionKey !== region.regionKey) {
      this.currentRegion = region;
      if (this.currentRegion.description) {
        this.teamsFilter.filterArray(this.currentRegion.regionKey, this.teamQuery, this.locationQuery, this.currentLeague.leagueKey);
        this.currentTeams = this.teamsFilter.getFilteredArray();
      } else {
        this.currentTeams = this.teams.slice((this.currentPage * TEAMS_PER_PAGE), ((this.currentPage + 1) * TEAMS_PER_PAGE));
      }
    }
  }

  selectLeague(league: League) {
    if (this.currentLeague.leagueKey !== league.leagueKey) {
      this.currentLeague = league;
      if (this.currentLeague.description) {
        this.teamsFilter.filterArray(this.currentRegion.regionKey, this.teamQuery, this.locationQuery, this.currentLeague.leagueKey);
        this.currentTeams = this.teamsFilter.getFilteredArray();
      } else {
        this.currentTeams = this.teams.slice((this.currentPage * TEAMS_PER_PAGE), ((this.currentPage + 1) * TEAMS_PER_PAGE));
      }
    }
  }

  queryTeam() {
    if (this.teamQuery !== null && this.teamQuery.length > 0) {
      this.teamsFilter.filterArray(this.currentRegion.regionKey, this.teamQuery, this.locationQuery, this.currentLeague.leagueKey);
      this.currentTeams = this.teamsFilter.getFilteredArray();
    }
    this.updateNagivationBars();
  }

  queryLocation() {
    if (this.locationQuery !== null && this.locationQuery.length > 0) {
      this.teamsFilter.filterArray(this.currentRegion.regionKey, this.teamQuery, this.locationQuery, this.currentLeague.leagueKey);
      this.currentTeams = this.teamsFilter.getFilteredArray();
    } else {
      this.currentTeams = this.teams.slice((this.currentPage * TEAMS_PER_PAGE), ((this.currentPage + 1) * TEAMS_PER_PAGE));
    }
  }

  clearFilter() {
    this.currentLeague = this.leagues[this.leagues.length - 1];
    this.currentRegion = this.regions[this.regions.length - 1];
    this.teamQuery = null;
    this.locationQuery = null;
    this.currentTeams = this.teams.slice((this.currentPage * TEAMS_PER_PAGE), ((this.currentPage + 1) * TEAMS_PER_PAGE));
    this.updateNagivationBars();
  }
}
