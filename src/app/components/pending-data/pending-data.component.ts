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
 
  pendingTeamData: any = {
    videos: [],
    images: [],
    logos: [],
    cads: []
  };

  pendingEventData: any = {
    pitmaps: [],
    venuemaps: [],
    schedules: [],
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
            });  
          };

          if (element["events"] != null) {
            Object.keys(element["events"]).forEach(key => {
              //this.pendingEventData.push(element["events"][key])
              switch (element["events"][key].media_type) {
                case 0:
                  this.pendingEventData.pitmaps.push(element["events"][key]);
                  break;
                case 1:
                  this.pendingEventData.schedules.push(element["events"][key]);
                  break;
                case 2:
                  this.pendingEventData.venuemaps.push(element["events"][key]);
                  break;
                case 6:
                  this.pendingEventData.images.push(element["events"][key]);
                  break;
                default:
                  break;
              }
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

  removeData(link: any): void {
    console.log(link)
  }

  addData(): void {
    // TODO Implement function
  }
    


}
