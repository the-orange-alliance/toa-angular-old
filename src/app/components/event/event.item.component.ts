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
  @Input() clickable: boolean = true;

  isLive(): boolean {
    let liveData: boolean = this.event.teamCount > 0 || this.event.matchCount > 0 ;
    let startValue: number = this.removeFractionalDay(new Date(this.event.startDate)).valueOf();
    let endValue: number   = this.removeFractionalDay(new Date(this.event.endDate)).valueOf();
    let todayValue: number = this.removeFractionalDay(new Date()).valueOf();

    return !this.hideLiveBadge && liveData && (todayValue <= endValue && todayValue >= startValue);
  }

  private removeFractionalDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
