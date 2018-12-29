import { Component, OnInit, Input } from '@angular/core';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdcSnackbar } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';

@Component({
  providers: [CloudFunctions],
  selector: 'toa-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.scss']
})
export class EventAdminComponent implements OnInit {

  @Input() uid: string;
  @Input() eventKey: string;

  generatingEventApiKey: boolean;
  eventApiKey: string;

  playlistURL: string;
  videos: any[];
  loadingVideos: boolean;
  showGetObjects: boolean;
  showConfirm: boolean;
  uploadingVideos: boolean;
  
  // These are for updating the Event Info
  event_name: string;
  start_date: string;
  end_date: string;
  website: string;
  venue: string;
  city: string;
  state: string;
  country: string;

  constructor(private cloud: CloudFunctions, private db: AngularFireDatabase,
              private snackbar: MdcSnackbar, private translate: TranslateService) {}

  ngOnInit() {
    this.db.object(`eventAPIs/${ this.eventKey }`).snapshotChanges().subscribe(item => {
      this.eventApiKey = item && item.payload.val() ? item.payload.val() + '' : null;
    });
    this.showGetObjects = true;
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

        this.translate.get('pages.event.subpages.admin.successfully', {value: this.videos.length}).subscribe((res: string) => {
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
    let startDate;
    if (this.start_date) { startDate = new Date(this.start_date).toISOString(); }
    let endDate;
    if (this.end_date) { endDate = new Date(this.end_date).toISOString(); }
    let jsonString = '[{';
    jsonString += `"event_key": "${this.eventKey}",`;
    jsonString += (this.event_name) ? `"event_name": "${this.event_name}",` : ``;
    jsonString += (startDate)       ? `"start_date": "${startDate}",`       : ``;
    jsonString += (endDate)         ? `"end_date": "${endDate}",`           : ``;
    jsonString += (this.venue)      ? `"venue": "${this.venue}",`           : ``;
    jsonString += (this.city)       ? `"city": "${this.city}",`             : ``;
    jsonString += (this.state)      ? `"state": "${this.state}",`           : ``;
    jsonString += (this.country)    ? `"country": "${this.country}",`       : ``;
    jsonString += (this.website)    ? `"website": "${this.website}",`       : ``;
    jsonString = jsonString.substring(0, jsonString.length - 1); // Remove Last Comma

    this.cloud.updateEvent(this.uid, this.eventKey, json).then((data: {}) => {
      jsonString += `}]`;

      const json = JSON.parse(jsonString);

      this.event_name = '';
      this.start_date = '';
      this.end_date  = '';
      this.venue = '';
      this.city = '';
      this.state = '';
      this.country = '';
      this.website = '';
    }, (err) => {
      // TODO
    });
  }

}
