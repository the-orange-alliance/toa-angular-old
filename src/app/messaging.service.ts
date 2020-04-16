import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { CloudFunctions } from './providers/cloud-functions';
import { User } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private firbaseMessaging: AngularFireMessaging,
    private cloud: CloudFunctions
  ) {}

  // Request permission for notification from firebase cloud messaging
  requestPermission(user: User) {
    const self = this;
    return new Promise((resolve, reject) => {
      return self.firbaseMessaging.requestToken.subscribe(
        (token) => {
          console.log('Your FCM token is ' + token);
          self.cloud.saveMessagingToken(user, token);
          resolve(token);
        },
        (err) => {
          console.error('Unable to get permission to notify.', err);
          reject(err);
        }
      );
    });
  }

  // Hook method when new notification received in foreground
  receiveMessage() {
    this.firbaseMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
