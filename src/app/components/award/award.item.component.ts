import { Component, Input } from '@angular/core';
import AwardRecipient from '../../models/AwardRecipient';

@Component({
  selector: 'toa-award-item',
  templateUrl: './award.item.component.html'
})

export class AwardItemComponent {
  @Input() award: AwardRecipient;
  @Input() mini: boolean;

  getIcon(): string {
    const awardNum =  parseInt(this.award.awardKey.replace(/\D/g, '' )); // Strip all non-numeric characters (get the award number)
    if (isNaN(awardNum)) {
      return 'trophy-award';
    } else {
      if (awardNum < 10) {
        return `numeric-${awardNum}-box-outline`;
      } else {
        return 'trophy-award';
      }
    }
  }
}
