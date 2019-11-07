import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { FTCDatabase } from '../../../../providers/ftc-database';
import { AngularFireDatabase } from '@angular/fire/database';
import { TranslateService } from '@ngx-translate/core';
import {MdcSelect, MdcSnackbar, MdcTextField} from '@angular-mdc/web';
import Event from '../../../../models/Event';
import EventLiveStream from '../../../../models/EventLiveStream';
import { User } from 'firebase/app';

@Component({
  selector: 'toa-event-add-stream',
  templateUrl: './event-add-stream.component.html',
  styleUrls: ['./event-add-stream.component.css']
})
export class EventAddStreamComponent implements OnInit {

  @Input() user: User;
  @Input() eventKey: string;
  @Input() eventData: Event;

  @ViewChild('stream_url', {static: false}) streamUrl: MdcTextField;
  @ViewChild('stream_name', {static: false}) streamName: MdcTextField;

  streamType = 'Youtube';
  hasStream = false;
  linkedStream: EventLiveStream;

  eventApiKey: string;
  showGetObjects: boolean;

  constructor(
    private cloud: CloudFunctions,
    private db: AngularFireDatabase,
    private ftc: FTCDatabase,
    private translate: TranslateService,
    private snackbar: MdcSnackbar
  ) { }

  ngOnInit() {
    this.db.object(`eventAPIs/${ this.eventKey }`).snapshotChanges().subscribe(item => {
      this.eventApiKey = item && item.payload.val() ? item.payload.val() + '' : null;
    });
    this.showGetObjects = true;

    this.ftc.getAllStreams().then((data: EventLiveStream[]) => {
      for (const stream of data) {
        if (stream.eventKey === this.eventData.eventKey) {
          this.hasStream = stream.isActive;
          this.linkedStream = stream;
          break;
        }
      }
    });
  }

  addStreamToPending(): void {
    let streamLink;
    let channelLink;
    let channelName;
    let streamType;
    const twitchRegex = new RegExp('^(?:https?:\\/\\/)?(?:www\\.|go\\.)?twitch\\.tv\\/([a-z0-9_]+)($|\\?)');
    const youtubeRegex = new RegExp('(?:youtube(?:-nocookie)?\\.com\\/(?:[^\\/\\n\\s]+\\/\\S+\\/|(?:v|e(?:mbed)?)\\/|\\S*?[?&]v=)|youtu\\.be\\/)([a-zA-Z0-9_-]{11})');
    if (this.streamType === 'Twitch' && twitchRegex.exec(this.streamUrl.value)) {
      const channelId = twitchRegex.exec(this.streamUrl.value)[1];
      streamLink = 'https://player.twitch.tv/?channel=' + channelId;
      channelLink = 'https://twitch.tv/' + channelId;
      channelName = channelId;
      streamType = 1;
    } else if (this.streamType === 'Youtube' && youtubeRegex.exec(this.streamUrl.value)) {
      const vidId = youtubeRegex.exec(this.streamUrl.value)[1];
      streamLink = 'https://www.youtube.com/embed/' + vidId;
      channelLink = 'https://www.youtube.com/watch?v=' + vidId;
      channelName = ''; // TODO: Implement Youtube API in here at some point
      streamType = 0;
    }

    if (streamLink) {
      const stream = new EventLiveStream();
      stream.streamKey = this.eventData.eventKey + '-LS1';
      stream.eventKey = this.eventData.eventKey;
      stream.channelName = channelName;
      stream.streamName = this.getFieldText(this.streamName);
      stream.streamType = streamType;
      stream.isActive = true;
      stream.streamURL = streamLink;
      stream.startDateTime = new Date(this.eventData.startDate).toJSON().slice(0, 19).replace('T', ' ');
      stream.endDateTime = new Date(this.eventData.endDate).toJSON().slice(0, 19).replace('T', ' ');
      stream.channelURL = channelLink;

      this.cloud.addStreamToPending(this.user, [stream.toJSON()]).then( (data: {}) => {
        this.showSnackbar('pages.event.subpages.admin.stream_card.success_linked');
        this.hasStream = true;
        this.linkedStream = stream;
      }, (err) => {
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      }).catch(console.log);
    } else {
      this.showSnackbar('general.error_occurred', 'S-URL');
    }
  }

  showSnackbar(translateKey: string, errorKey?: string, value?: number) {
    const isEmail = (errorKey) ? errorKey.indexOf('428') > -1 : undefined;
    const msg = (isEmail) ? 'pages.event.subpages.admin.verify_email' : translateKey;

    this.translate.get(msg, {value: value}).subscribe((res: string) => {

      const message = (errorKey && !isEmail) ? `${res} (${errorKey})` : res;

      const snackBarRef = this.snackbar.open(message, (isEmail) ? 'Verify' : null);

      snackBarRef.afterDismiss().subscribe(reason => {
        if (reason === 'action') {
          this.user.sendEmailVerification().then(() => {
            this.showSnackbar(`pages.event.subpages.admin.success_sent_verify_email`);
          }).catch((err) => {
            this.showSnackbar(`general.error_occurred`, `HTTP-${err.status}`);
          })
        }
      });
    });
  }

  streamRadioClick(type: string): void {
    this.streamType = (type) ? type : this.streamType;
    this.translate.get('pages.event.subpages.admin.stream_card.url', { provider: this.streamType }).subscribe((res: string) => {
      this.streamUrl.label = res;
      this.streamUrl.disabled = true; // Forces Text on the text box to update
      this.streamUrl.disabled = false;
    });
  }

  getFieldText(elm: MdcTextField) {
    return elm.value;
  }

}
