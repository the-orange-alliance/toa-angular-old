import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import AwardRecipient from "../../../../models/AwardRecipient";

@Component({
  providers: [FTCDatabase],
  selector: 'toa-event-awards',
  templateUrl: './event-awards.component.html'
})
export class EventAwardsComponent implements OnInit {

  @Input() event: any;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  isNewList(i: number): boolean {
    return (i > 0 && this.getHeader(this.event.awards[i]) !== this.getHeader(this.event.awards[i - 1])) || i === 0
  }

  getHeader(awardRecipient: AwardRecipient) {
    const key = awardRecipient.awardKey;
    if (key.startsWith("INS")) {
      return "Inspire Award Winners";
    } else if (key.startsWith("THK")) {
      return "Think Award Winners";
    } else if (key.startsWith("CNT")) {
      return "Connect Award Winners";
    } else if (key.startsWith("INV")) {
      return "Rockwell Collins Innovate Award Winners";
    } else if (key.startsWith("DSN")) {
      return "Design Award Winners";
    } else if (key.startsWith("MOT")) {
      return "Motivate Award Winners";
    } else if (key.startsWith("CTL")) {
      return "Control Award Winners";
    } else if (key.startsWith("PRM")) {
      return "Promote Award Winners";
    } else if (key.startsWith("CMP")) {
      return "Compass Award Winners";
    } else if (key.startsWith("JUD")) {
      return "Judges Award Winners";
    } else if (key.startsWith("WIN")) {
      return "Winning Alliance Award Winners";
    } else if (key.startsWith("FIN")) {
      return "Finalist Alliance Award Winners";
    } else {
      return awardRecipient.awardName + 's';
    }
  }
}
