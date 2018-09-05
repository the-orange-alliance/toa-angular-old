import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { MatchParser } from '../../util/match-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import WebAnnouncement from '../../models/WebAnnouncement';
import Event from '../../models/Event';
import Team from '../../models/Team';
import Match from '../../models/Match';
import MatchParticipant from '../../models/MatchParticipant';

@Component({
  selector: 'toa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class HomeComponent {

  public currentAnnouncement: WebAnnouncement;
  public currentEvents: Event[];

  qual_match: any;
  elim_match: any;
  normal_match: any;

  match_count: number;
  teams_count: number;

  match_insights: any;
  insights: any;

  week_start: any;
  week_end: any;

  constructor(private router: Router, private ftc: FTCDatabase, private globaltoa: TheOrangeAllianceGlobals) {
    this.globaltoa.setTitle('Home');
    this.ftc.getTeamSize().then((data: number) => {
      this.teams_count = data;
    }).catch((error: any) => {
      console.log(error);
    });
    this.ftc.getMatchSize().then((data: number) => {
      this.match_count = data;
    }).catch((error: any) => {
      console.log(error);
    });
    this.ftc.getHighScoreQual().then((data: Match) => {
      this.qual_match = this.getBestMatch(data);
      this.ftc.getMatchParticipants(this.qual_match.match_key).then((qual_data: MatchParticipant[]) => {
        let teams = '';
        for (const station of qual_data) {
          teams += station.teamKey + ',';
        }
        this.qual_match.teams = teams.toString().substring(0, teams.length - 1);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
    this.ftc.getHighScoreElim().then((elim_data) => {
      this.elim_match = this.getBestMatch(elim_data);
      this.ftc.getMatchParticipants(this.elim_match.match_key).then((data: any) => {
        let teams = '';
        for (const station of data) {
          teams += station.team_key + ',';
        }
        this.elim_match.teams = teams.toString().substring(0, teams.length - 1);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
    this.ftc.getHighScoreWithPenalty().then((match_data) => {
      this.normal_match = this.getBestMatch(match_data);
      this.ftc.getMatchParticipants(this.normal_match.match_key).then((data: any) => {
        let teams = '';
        for (const station of data) {
          teams += station.team_key + ',';
        }
        this.normal_match.teams = teams.toString().substring(0, teams.length - 1);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
    this.ftc.getSeasonEvents('1718').then((events: Event[]) => {
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate() ); /** remove fractional day */
      this.currentEvents = [];
      for (const event of events) {
        this.week_start = this.getStartOfWeek(new Date(event.startDate));
        this.week_end = this.getEndofWeek(new Date(event.endDate));
        if (this.isBetweenDates(this.week_start, this.week_end, today)) {
          this.currentEvents.push(event);
        }
      }
    }, (err) => {
      console.log(err);
    });
    this.ftc.getAnnouncements().then((announcements: WebAnnouncement[]) => {
      const today = new Date();
      for (const announcement of announcements) {
        if (announcement.isActive) {
          this.currentAnnouncement = announcement;
          break;
        }
      }
    });
  }

  getStartOfWeek(d) {
    const day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0 ? -6 : 1) - day );
  }

  getEndofWeek(d) {
    const day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0 ? 0 : 7) - day );
  }

  isBetweenDates(start_date, end_date, today) {
    return (today <= end_date && today >= start_date);
  }

  getBestMatch(matches: any) {
    // This will remove matches with duplicate scores
    let last_red_score = null;
    for (let i = 0; i < matches.length; i++) {
      if (last_red_score === matches[i].red_score) {
        matches.splice(i - 1, i);
      }
      last_red_score = matches[i].red_score;
    }

    // This will determine which alliance had the higher score
    // Also, red alliance always comes first from the API
    if (matches[0].red_score > matches[1].blue_score) {
      return matches[0];
    } else {
      return matches[1];
    }

  }

  getMatchString(match_data): string {
    return new MatchParser(match_data).toString();
  }

  getStation(match_data, station: number): string {
    return match_data.teams.toString().split(',')[station];
  }

  openTeamPage(team: any) {
    this.router.navigate(['/teams', team]);
  }

  openEvent(event_key, e): void {
    this.router.navigate(['/events', event_key]);
  }

  getNumberOfTeams(match_data) {
    return match_data.teams.toString().split(',').length;
  }

  openMatchDetails(match_data: any) {
    this.router.navigate(['/matches', match_data]);
  }

}
