import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import AwardRecipient from '../../../../models/AwardRecipient';

@Component({
  selector: 'toa-event-awards',
  templateUrl: './event-awards.component.html'
})
export class EventAwardsComponent {

  @Input() event: any;

  constructor(private translate: TranslateService) {

  }

  isNewList(i: number): boolean {
    return i > 0 ? this.getHeader(this.event.awards[i]) !== this.getHeader(this.event.awards[i - 1]) : true
  }

  getHeader(awardRecipient: AwardRecipient) {
    // TODO: translate
    const key = awardRecipient.awardKey;
    const season = parseInt(awardRecipient.awardsKey);  // the season component, i.e. 2122
    if (key.startsWith('INS')) {
      return 'Inspire Award Winners';
    } else if (key.startsWith('THK')) {
      return 'Think Award Winners';
    } else if (key.startsWith('CNT')) {
      return 'Connect Award Winners';
    } else if (key.startsWith('INV')) {
      if (season >= 2122) {  // in 2021-22 the award was renamed
        return 'Innovate Award sponsored by Raytheon Technologies Winners';
      } else {
        return 'Collins Aerospace Innovate Award Winners';
      }
    } else if (key.startsWith('DSN')) {
      return 'Design Award Winners';
    } else if (key.startsWith('MOT')) {
      return 'Motivate Award Winners';
    } else if (key.startsWith('CTL')) {
      if (season >= 2122) {  // in 2021-22 the award was renamed
          return 'Control Award sponsored by Arm, Inc. Winners';
      } else {
          return 'Control Award Winners';
      }
    } else if (key.startsWith('PRM')) {
      return 'Promote Award Winners';
    } else if (key.startsWith('CMP')) {
      return 'Compass Award Winners';
    } else if (key.startsWith('JUD')) {
      return 'Judges Award Winners';
    } else if (key.startsWith('WIN')) {
      return 'Winning Alliance Award Winners';
    } else if (key.startsWith('FIN')) {
      return 'Finalist Alliance Award Winners';
    } else if (key.startsWith('DNSSF')) {
      return 'Dean\'s List Finalist Award Winners';
    } else if (key.startsWith('DNSF')) {
      return 'Dean\'s List Award Winners';
    } else if (key.startsWith('TR')) {
      return 'Top Ranked Teams';
    } else {
      return awardRecipient.awardName + 's';
    }
  }

}
