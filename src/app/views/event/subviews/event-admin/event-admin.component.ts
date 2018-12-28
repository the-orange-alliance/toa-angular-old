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
export class EventAdminComponent implements OnInit{

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

}
