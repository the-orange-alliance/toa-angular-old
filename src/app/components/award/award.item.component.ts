import { Component, Input } from '@angular/core';
import AwardRecipient from '../../models/AwardRecipient';

@Component({
  selector: 'toa-award-item',
  templateUrl: './award.item.component.html'
})

export class AwardItemComponent {
  @Input() award: AwardRecipient;
}
