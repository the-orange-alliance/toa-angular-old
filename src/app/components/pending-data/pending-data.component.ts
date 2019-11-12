import { Component, OnInit, SecurityContext, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CloudFunctions }  from '../../providers/cloud-functions';
import User from '../../models/User';
//import { User } from 'firebase';

@Component({
  selector: 'toa-pending-data',
  templateUrl: './pending-data.component.html',
  styleUrls: ['./pending-data.component.css']
})
export class PendingDataComponent implements OnInit {

  @Input() user: User;

  pendingData: any;
  sampleData: any = {
    videos: [
      "https://www.youtube.com/embed/oHg5SJYRHA0",
      "https://www.youtube.com/embed/EPIGSuwP1",
      "https://www.youtube.com/embed/PErqizZqLjI",
      "https://www.youtube.com/embed/oHg5SJYRHA0",
      "https://www.youtube.com/embed/EPIGSuwP1",
      "https://www.youtube.com/embed/PErqizZqLjI",
      "https://www.youtube.com/embed/oHg5SJYRHA0",
      "https://www.youtube.com/embed/EPIGSuwP1",
      "https://www.youtube.com/embed/PErqizZqLjI",
    ],
    images: [
      "https://i.imgur.com/SEdSLdK.jpg",
      "https://i.imgur.com/ysbHgh0.jpg",
      "https://i.imgur.com/fcBpVUI.jpg",
      "https://i.imgur.com/27RplxB.jpg",
      "https://i.imgur.com/Nz775rx.jpg"
    ],
    cad: [
      "https://grabcad.com/library/v12-engine-version-b-1",
      "https://grabcad.com/library/cpu-fan-80mm-1",
      "https://grabcad.com/library/151208_conveyor-w370-1"
    ]
  }

  constructor(
    protected domSanitizer: DomSanitizer,
    private cloud: CloudFunctions
  ) { }

  ngOnInit() {
    this.pendingData = this.cloud.getPendingMedia(this.user.firebaseUser);
    console.log(this.pendingData);
  }

  /* TODO: 
   * MessageBox to undo transaction
   * 
   * 
   */

  removeVideo(id: number): void {
    this.sampleData.videos.splice(id, 1);
  }

  removePic(id: number): void {
    this.sampleData.images.splice(id, 1);
  }
    


}
