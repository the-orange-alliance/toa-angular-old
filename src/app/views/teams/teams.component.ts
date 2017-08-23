import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { FTCDatabase } from "../../providers/ftc-database";

const TEAMS_PER_PAGE = 500;

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  providers: [FTCDatabase]
})
export class TeamsComponent implements OnInit {

  teams: any[];
  teams_count: number;

  pages: any[];
  cur_page: number;

  constructor(private router: Router, private ftc: FTCDatabase) {}

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
  }

  openTeam(team_number): void {
    this.router.navigate(['/teams', team_number]);
  }

  getTeams(page_index): void {
    if (page_index > this.pages.length-1) {
      this.cur_page = this.pages.length-1;
    } else if (page_index <= 0) {
      this.cur_page = 0;
    } else {
      this.cur_page = page_index;
    }
    this.ftc.getTeams(this.cur_page * TEAMS_PER_PAGE).subscribe((data) => {
      this.teams = data;
    }, (err) => {
      console.log(err);
    });
  }

  incIndex() {
    return this.cur_page+1;
  }

  decIndex() {
    return this.cur_page-1;
  }

}
