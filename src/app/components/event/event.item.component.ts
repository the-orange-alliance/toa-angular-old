import { Component, Input } from '@angular/core';
import Event from '../../models/Event';

@Component({
  selector: 'toa-event-item',
  templateUrl: './event.item.component.html',
  styleUrls: ['./event.item.component.scss']
})
export class EventItemComponent {

  @Input() event: Event;
  @Input() hideLiveBadge: boolean;

  isLive(): boolean {
    let startValue: number = this.removeFractionalDay(new Date(this.event.startDate)).valueOf();
    let endValue: number   = this.removeFractionalDay(new Date(this.event.endDate)).valueOf();
    let todayValue: number = this.removeFractionalDay(new Date()).valueOf();

    return !this.hideLiveBadge && (todayValue <= endValue && todayValue >= startValue);
  }

  private removeFractionalDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
