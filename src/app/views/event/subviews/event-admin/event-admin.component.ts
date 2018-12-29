import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdcSnackbar, MdcTextField } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import Event from '../../../../models/Event';

@Component({
  providers: [CloudFunctions],
  selector: 'toa-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.scss']
})
export class EventAdminComponent implements OnInit, AfterViewInit {

  @Input() uid: string;
  @Input() eventKey: string;
  @Input() event: Event;

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

  constructor(private cloud: CloudFunctions, private db: AngularFireDatabase,
              private snackbar: MdcSnackbar, private translate: TranslateService) {}

  ngOnInit() {
    this.db.object(`eventAPIs/${ this.eventKey }`).snapshotChanges().subscribe(item => {
      this.eventApiKey = item && item.payload.val() ? item.payload.val() + '' : null;
    });
    this.showGetObjects = true;
  }

  ngAfterViewInit() {
    // Setup the edit event
    this.setFieldText(this.eventName, this.event.eventName);
    this.setFieldText(this.startDate, this.event.startDate.substr(0, 10));
    this.setFieldText(this.endDate, this.event.endDate.substr(0, 10));
    this.setFieldText(this.website, this.event.website);

    this.setFieldText(this.website, this.event.website);
    this.setFieldText(this.venue, this.event.venue);
    this.setFieldText(this.city, this.event.city);
    this.setFieldText(this.state, this.event.stateProv);
    this.setFieldText(this.country, this.event.country);
  }

  generateEventApiKey(): void {
    this.generatingEventApiKey = true;
    this.cloud.generateEventApiKey(this.uid, this.eventKey).then(() => {
      this.generatingEventApiKey = false;
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
        if (data) {
          this.videos = data['matches'];
          this.showGetObjects = false;
          this.showConfirm = true;
        }
      }, (err) => {
        this.loadingVideos = false;
      });
    } else {
      // TODO
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

        this.translate.get('pages.event.subpages.admin.successfully_uploadvideos', {value: this.videos.length}).subscribe((res: string) => {
          this.snackbar.show(res, null, {align: 'center'});
        });

        this.videos = [];
      }, (err) => {
        this.uploadingVideos = false;
      });
    } else {
      // TODO
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
      this.translate.get('pages.event.subpages.admin.successfully_updateinfo').subscribe((res: string) => {
        this.snackbar.show(res, null, {align: 'center'});
      });
    }, (err) => {
      // TODO
    });
  }

  setFieldText(elm: MdcTextField, text: string) {
    elm.setValue(text);

    // Fix MDC bug
    if (elm._floatingLabel) {
      elm._notchedOutline.notch(elm._floatingLabel.getWidth())
    }
  }

  getFieldText(elm: MdcTextField) {
    return elm.value;
  }

}
