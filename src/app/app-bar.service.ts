import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class AppBarService {

  titleShort: string = 'TOA';
  titleLong: string = 'The Orange Alliance';

  title: string = this.titleLong;
  @Output() titleChange: EventEmitter<string> = new EventEmitter();

  setTitle(title: string, full: boolean = false) {
    if (title !== null) {
      this.title = full ? title : this.titleShort + ' - ' + title;
    } else {
      this.title = this.titleLong;
    }
    this.titleChange.emit(this.title);
  }
}
