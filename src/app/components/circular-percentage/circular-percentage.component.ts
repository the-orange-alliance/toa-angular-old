import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'toa-circular-percentage',
  templateUrl: './circular-percentage.component.html',
  styleUrls: ['./circular-percentage.component.scss']
})
export class CircularPercentageComponent implements OnInit {

  @Input() title: string;
  @Input() value: number;
  @Input() max: number;

  css: string;
  centerText: string;

  ngOnInit() {
    if (this.max) {
      this.css = Math.round(this.value / this.max * 100).toString().split('.')[0];
      this.centerText = String(this.value);
    } else {
      this.css = Math.round(this.value).toString().split('.')[0];
      this.centerText = `${this.value}%`;
    }
  }
}
