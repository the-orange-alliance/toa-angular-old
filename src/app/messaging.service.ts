import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private firbaseMessaging: AngularFireMessaging) {
    this.firbaseMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  // Request permission for notification from firebase cloud messaging
  requestPermission(userId) {
    this.firbaseMessaging.requestToken.subscribe(
      (token) => {
        console.log('Permission granted!');
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  // Hook method when new notification received in foreground
  receiveMessage() {
    this.firbaseMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      })
  }
}
