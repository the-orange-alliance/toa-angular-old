import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FTCDatabase } from "../../providers/ftc-database";
import { MatchParser } from "../../util/match-utils";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [FTCDatabase]
})
export class HomeComponent {

  penalty_match: any;
  regular_match: any;
  match_count: number;

  constructor(private router: Router, private ftc: FTCDatabase) {
    this.ftc.getAllMatches().subscribe((data) => {
      this.match_count = data[0].MatchCount;
    }, (err) => {
      console.log(err);
    });
    this.ftc.getHighScoreNoPenalty().subscribe((data) => {
      this.penalty_match = data[0];
      this.ftc.getEventName(this.penalty_match.event_key).subscribe((name) => {
        this.penalty_match.event_name = name[0].event_name;
      }, (err) => {
        console.log(err);
      })
    }, (err) => {
      console.log(err);
    });
    this.ftc.getHighScoreWithPenalty().subscribe((data) => {
      this.regular_match = data[0];
      this.ftc.getEventName(this.regular_match.event_key).subscribe((name) => {
        this.regular_match.event_name = name[0].event_name;
      }, (err) => {
        console.log(err);
      })
    }, (err) => {
      console.log(err);
    });

    this.ftc.getServerDefaultResponse("testing").subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });

  }

  openEvent(event_key, e): void {
    this.router.navigate(['/events', event_key]);
  }

  getMatchString(match_data): string {
    return new MatchParser(match_data).toString();
  }

}
