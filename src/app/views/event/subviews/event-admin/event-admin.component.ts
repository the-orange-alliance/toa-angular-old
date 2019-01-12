import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { AngularFireDatabase } from '@angular/fire/database';
import { MdcSnackbar, MdcTextField } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import Event from '../../../../models/Event';
import {Router} from '@angular/router';

@Component({
  providers: [CloudFunctions],
  selector: 'toa-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.scss']
})
export class EventAdminComponent implements OnInit, AfterViewInit {

  @Input() uid: string;
  @Input() eventKey: string;
  @Input() eventData: Event;

  generatingEventApiKey: boolean;
  eventApiKey: string;

  playlistURL: string;
  videos: any[];
  loadingVideos: boolean;
  showGetObjects: boolean;
  showConfirm: boolean;
  uploadingVideos: boolean;

  // These are for updating the Event Info
  @ViewChild('event_name') eventName: MdcTextField;
  @ViewChild('start_date') startDate: MdcTextField;
  @ViewChild('end_date') endDate: MdcTextField;
  @ViewChild('website') website: MdcTextField;
  @ViewChild('venue') venue: MdcTextField;
  @ViewChild('city') city: MdcTextField;
  @ViewChild('state') state: MdcTextField;
  @ViewChild('country') country: MdcTextField;

  constructor(private cloud: CloudFunctions, private db: AngularFireDatabase, private snackbar: MdcSnackbar,
              private translate: TranslateService, private router: Router) {}

  ngOnInit() {
    this.db.object(`eventAPIs/${ this.eventKey }`).snapshotChanges().subscribe(item => {
      this.eventApiKey = item && item.payload.val() ? item.payload.val() + '' : null;
    });
    this.showGetObjects = true;
  }

  ngAfterViewInit() {
    // Setup the edit event
    this.setFieldText(this.eventName, this.eventData.eventName);
    this.setFieldText(this.startDate, this.eventData.startDate.substr(0, 10));
    this.setFieldText(this.endDate, this.eventData.endDate.substr(0, 10));
    this.setFieldText(this.website, this.eventData.website);

    this.setFieldText(this.website, this.eventData.website);
    this.setFieldText(this.venue, this.eventData.venue);
    this.setFieldText(this.city, this.eventData.city);
    this.setFieldText(this.state, this.eventData.stateProv);
    this.setFieldText(this.country, this.eventData.country);
  }

  generateEventApiKey(): void {
    this.generatingEventApiKey = true;
    this.cloud.generateEventApiKey(this.uid, this.eventKey).then(() => {
      this.generatingEventApiKey = false;
    }, (err) => {
      this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
    }).catch(console.log);
  }

  playlistMatchify() {
    const playlistId = /[&|\?]list=([a-zA-Z0-9_-]+)/gi.exec(this.playlistURL || '');

    if (playlistId && playlistId.length > 0) {
      this.playlistURL = '';
      this.videos = [];
      this.loadingVideos = true;
      this.cloud.playlistMatchify(this.uid, this.eventKey, playlistId[1]).then((data: {}) => {
        this.loadingVideos = false;
        if (data && data['matches'].length > 0) {
          this.videos = data['matches'];
          this.showGetObjects = false;
          this.showConfirm = true;
        } else {
          this.showSnackbar('pages.event.subpages.admin.playlist_card.error');
        }
      }, (err) => {
        this.loadingVideos = false;
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('pages.event.subpages.admin.playlist_card.invalid_url');
    }
  }

  setVideos() {
    if (this.videos && this.videos.length > 0) {
      this.uploadingVideos = true;
      const toUpload = [];
      this.videos.forEach(function (video) {
        toUpload.push({
          'match_key': video['match_key'],
          'video_url': video['video_url']
        })
      });
      this.cloud.setVideos(this.uid, this.eventKey, toUpload).then((data: {}) => {
        this.uploadingVideos = false;
        this.showGetObjects = true;
        this.showConfirm = false;

        this.showSnackbar('pages.event.subpages.admin.playlist_card.successfully', null, this.videos.length);

        this.videos = [];
      }, (err) => {
        this.uploadingVideos = false;
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('pages.event.subpages.admin.playlist_card.error');
    }
  }

  updateEvent() {
    const json = [
      {
       'event_key':  this.eventKey,
       'event_name':  this.getFieldText(this.eventName),
       'start_date':  new Date(this.getFieldText(this.startDate)).toISOString(),
       'end_date':  new Date(this.getFieldText(this.endDate)).toISOString(),
       'venue':  this.getFieldText(this.venue),
       'city':  this.getFieldText(this.city),
       'state':  this.getFieldText(this.state),
       'country':  this.getFieldText(this.country),
       'website':  this.getFieldText(this.website)
      }
    ];

    this.cloud.updateEvent(this.uid, this.eventKey, json).then((data: {}) => {
      this.showSnackbar('pages.event.subpages.admin.update_info_card.successfully');
    }, (err) => {
      this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
    });
  }

  setFieldText(elm: MdcTextField, text: string) {
    elm.setValue(text);

    // Fix MDC bug
    if (elm._floatingLabel) {
      elm._notchedOutline.notch(elm._floatingLabel.getWidth()); // Don't do ',true' as it causes issues in production builds.
    }
  }

  getFieldText(elm: MdcTextField) {
    return elm.value;
  }

  showSnackbar(translateKey: string, errorKey?: string, value?: number) {
    this.translate.get(translateKey, {value: value}).subscribe((res: string) => {
      const message = errorKey ? `${res} (${errorKey})` : res;

      this.snackbar.open(message, null);
    });
  }

  sendAnalytic(category, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: this.router.url,
      eventAction: action,
      eventValue: 10
    });
  }
}
