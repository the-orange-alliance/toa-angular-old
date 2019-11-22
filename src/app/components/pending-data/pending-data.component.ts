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

  pendingTeamData: any = {
    videos: [],
    images: [],
    logos: [],
    cads: []
  };
  pendingEventData: any = {
    images: []
  };
  pendingStreamData: any = [];

  constructor(
    protected domSanitizer: DomSanitizer,
    private cloud: CloudFunctions
  ) { }

  ngOnInit() {
    this.cloud.getPendingMedia(this.user.firebaseUser)
      .then(result => {
        this.pendingData = Object.keys(result).map(i => result[i]);
        console.log(this.pendingData);
        this.pendingData.forEach(element => {
          
          if (element["streams"] != null) {
            Object.keys(element["streams"]).forEach(stream => {
              
              if (element["streams"][stream].media_link.includes("watch?v=")) {
                const link = element["streams"][stream].media_link.replace("watch?v=", "embed/");
                element["streams"][stream].media_link = link;
              }
              

              this.pendingStreamData.push(
                element["streams"][stream]);
            });
                       
          };

          if (element["teams"] != null) {
            Object.keys(element["teams"]).forEach(key => {

              // Sorts the team data into different media types
              switch (element["teams"][key].media_type) {
                case 1:
                  this.pendingTeamData.cads.push(element["teams"][key]);
                  break;
                case 3:
                  if (element["teams"][key].media_link.includes("watch?v=")) {
                    const link = element["streams"][key].media_link.replace("watch?v=", "embed/");
                    element["teams"][key].media_link = link;
                  }
                  this.pendingTeamData.videos.push(element["teams"][key]);
                  break;
                case 4:
                  this.pendingTeamData.images.push(element["teams"][key]);
                  break;
                case 5:
                  this.pendingTeamData.logos.push(element["teams"][key]);
                  break;
                default:
                  break;
              }

              // if (element["teams"][key].media_link.includes("watch?v=")) {
              //   const link = element["streams"][key].media_link.replace("watch?v=", "embed/");
              //   element["teams"][key].media_link = link;
              // }

              // this.pendingTeamData.push(element["teams"][key])
            });  
          };

          if (element["events"] != null) {
            Object.keys(element["events"]).forEach(key => {
              this.pendingEventData.push(element["events"][key])
            });
          };
          
        });
        console.log(this.pendingStreamData);
        console.log(this.pendingTeamData);
        console.log(this.pendingEventData);
      });
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
