import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { TeamSorter } from '../../util/team-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import Team from '../../models/Team';
import Region from '../../models/Region';

const TEAMS_PER_PAGE = 500;

@Component({
  selector: 'toa-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  currentTeams: Team[];
  teamsSorter: TeamSorter;
  regions: Region[];

  query: string;

  public rightSide: Team[];
  public leftSide: Team[];

  constructor(private router: Router, private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals) {
    this.query = null;
    this.teamsSorter = new TeamSorter();
    this.app.setTitle('Teams');
    this.app.setDescription(`List of FIRST Tech Challenge teams`);
  }

  ngOnInit(): void {
    this.ftc.getAllTeams().then((data: Team[]) => {
      this.teams = data;
      this.getTeams();
    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      this.regions = data
    });
  }

  openTeam(team_number): void {
    this.router.navigate(['/teams', team_number]);
  }

  getTeams() {
    const query = this.query && this.query.trim().length > 0 ? this.query.toLowerCase().trim() : null;
    if (query) {
      let isRegion = false;
      if (this.regions && query) {
        for (const region of this.regions) {
          if (region.regionKey.toLowerCase() === query) {
            isRegion = true;
          }
        }
      }

      if (isRegion) {
        this.currentTeams = this.teams.filter(team => (
          team.regionKey.toLowerCase() === query
        ));
      } else {
        this.currentTeams = this.teams.filter(team => (
          String(team.teamKey).includes(query) ||
          (team.teamNameShort && team.teamNameShort.toLowerCase().includes(query)) ||
          (team.city && team.city.toLowerCase().includes(query)) ||
          (team.country && team.country.toLowerCase().includes(query))
        ));
      }
    } else {
      this.currentTeams = this.teams;
    }

    if (this.currentTeams.length === 1) {
      this.leftSide = [this.currentTeams[0]];
      this.rightSide = [];
    } else {
      this.currentTeams = this.currentTeams.slice(0, TEAMS_PER_PAGE);
      this.leftSide = this.currentTeams.slice(0, this.currentTeams.length / 2);
      this.rightSide = this.currentTeams.slice(this.currentTeams.length / 2, this.currentTeams.length);
    }
  }

  scrollTo(selectors: string) {
    const elementList = document.querySelectorAll(selectors);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
