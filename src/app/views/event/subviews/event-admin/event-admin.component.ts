import { Component, OnInit, Input } from '@angular/core';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private cloud: CloudFunctions, public db: AngularFireDatabase) {}

  ngOnInit() {
    this.db.object(`eventAPIs/${ this.eventKey }`).snapshotChanges().subscribe(item => {
      this.eventApiKey = item && item.payload.val() ? item.payload.val() + '' : null;
    });
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
      this.loadingVideos = true;
      this.cloud.playlistMatchify(this.uid, this.eventKey, playlistId[1]).then((data: {}) => {
        this.loadingVideos = false;
        if (data) {
          this.videos = data['matches'];
        }
      });
    } else {
      // TODO
    }
  }
}
