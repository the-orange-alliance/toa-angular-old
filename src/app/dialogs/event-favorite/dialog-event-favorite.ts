import { Component, Inject, ViewChild } from '@angular/core';
import { MDC_DIALOG_DATA, MdcDialogRef, MdcCheckbox, MdcCheckboxChange, MdcSnackbar } from '@angular-mdc/web';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FTCDatabase } from '../../providers/ftc-database';
import { CloudFunctions } from '../../providers/cloud-functions';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from '../../messaging.service';
import { environment } from '../../../environments/environment';
import { User } from 'firebase/app';

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
  isDevMode = false;
  user: User = null;

  @ViewChild('favorite') favorite: MdcCheckbox;
  @ViewChild('matchScores') matchScores: MdcCheckbox;

  constructor(dialogRef: MdcDialogRef<DialogEventFavorite>, @Inject(MDC_DIALOG_DATA) data: any, private messaging: MessagingService,
              private snackbar: MdcSnackbar, cloud: CloudFunctions, translate: TranslateService) {
    this.settings = data.settings;
    this.isDevMode = !environment.production || window.location.href.includes('dev.theorangealliance.org');
    this.user = data.user;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        cloud.updateEventSettings(this.user, data.eventKey, this.settings).then(() => {
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
        this.messaging.requestPermission(this.user);
      }
    }
  }
}
