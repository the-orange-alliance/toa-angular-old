import { Component, Inject } from '@angular/core';
import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web';

@Component({
  templateUrl: 'dialog-text.html',
})
export class DialogText {

  title: string;
  text: string;

  constructor(dialogRef: MdcDialogRef<DialogText>, @Inject(MDC_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.text = data.text;
  }
}
