import { Component, Input, ViewEncapsulation } from '@angular/core';
import Event from '../../models/Event';

@Component({
  selector: 'toa-event-item',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './event.item.component.html',
  styleUrls: ['./event.item.component.scss']
})
export class EventItemComponent {

  @Input() event: Event;
  @Input() hideLiveBadge: boolean;
  @Input() clickable = true;
  @Input() dense = false;

  isLive(): boolean {
    const liveData = this.event.teamCount > 0 || this.event.matchCount > 0 ;
    const startValue = this.removeFractionalDay(new Date(this.event.startDate)).valueOf();
    const endValue = this.removeFractionalDay(new Date(this.event.endDate)).valueOf();
    const todayValue = this.removeFractionalDay(new Date()).valueOf();

    return !this.hideLiveBadge && liveData && (todayValue <= endValue && todayValue >= startValue);
  }

  private removeFractionalDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
