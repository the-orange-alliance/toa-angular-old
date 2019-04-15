import { Component, Inject, ViewChild } from '@angular/core';
import { MDC_DIALOG_DATA, MdcDialogRef, MdcCheckbox, MdcCheckboxChange, MdcSnackbar } from '@angular-mdc/web';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FTCDatabase } from '../../providers/ftc-database';
import { User } from 'firebase/app';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { CloudFunctions } from '../../providers/cloud-functions';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: 'dialog-event-favorite.html',
  styleUrls: ['./dialog-event-favorite.scss'],
  providers: [FTCDatabase, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class DialogEventFavorite {

  settings: {
    favorite: boolean,
    subscriptions: any
  } = {
    favorite: false,
    subscriptions: {}
  };

  @ViewChild('favorite') favorite: MdcCheckbox;
  @ViewChild('matchScores') matchScores: MdcCheckbox;

  constructor(dialogRef: MdcDialogRef<DialogEventFavorite>, @Inject(MDC_DIALOG_DATA) data: any, private messaging: AngularFireMessaging,
              private snackbar: MdcSnackbar, cloud: CloudFunctions, translate: TranslateService) {
    this.settings = data.settings;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        cloud.updateEventSettings(data.user, data.eventKey, this.settings).then(() => {
          translate.get('pages.event.settings.saved').subscribe((res: string) => {
            this.snackbar.open(res)
          });
        }).catch((error) => {
          console.log(error);
          translate.get('pages.event.settings.failed').subscribe((res: string) => {
            this.snackbar.open(res)
          });
        });
      }
    });
  }

  onChange(event: MdcCheckboxChange, key: string) {
    const checked = event.checked;
    if (key === 'favorite') {
      this.settings.favorite = checked;
    } else {
      this.settings.subscriptions[key] = checked;
      if (checked) {
        this.requestPermission();
      }
    }
  }

  requestPermission() {
    this.messaging.requestToken.subscribe(
      (token) => {
          console.log('Permission granted!', token);
          this.messaging.messages.subscribe((message) => { console.log(message); });
      },
      (error) => {
        this.snackbar.open(error.message);
        console.error(error);
      },
    );
  }
}
