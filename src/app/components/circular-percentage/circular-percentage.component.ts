import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'toa-circular-percentage',
  templateUrl: './circular-percentage.component.html',
  styleUrls: ['./circular-percentage.component.scss']
})
export class CircularPercentageComponent implements OnInit {

  @Input() title: string;
  @Input() value: number;
  @Input() showInNumber: number;

  css: string;
  centerText: string;

  ngOnInit() {
    this.css = Math.round(this.value).toString().split('.')[0];
    if (this.showInNumber) {
      this.centerText = Math.round(this.value * this.showInNumber / 100) + '';
    } else {
      this.centerText = `${this.value}%`;
    }
  }
}
