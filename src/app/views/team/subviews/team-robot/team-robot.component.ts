import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Team from "../../../../models/Team";
import Media from "../../../../models/Media";

@Component({
  providers: [FTCDatabase],
  selector: 'toa-team-robot',
  templateUrl: './team-robot.component.html'
})
export class TeamRobotComponent implements OnInit {

  @Input() team: Team;

  github: Media;
  cad: Media;
  notebook: Media;
  reveal: Media;

  images: Media[] = [];

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.team && this.team.media) {
      this.images = [];
      for (let media of this.team.media) {
        if (media.mediaType === 0) {
          this.github = media;
          console.log(this.github)
        }
        if (media.mediaType === 1) {
          this.cad = media;
        }
        if (media.mediaType === 2) {
          this.notebook = media;
        }
        if (media.mediaType === 3) {
          this.reveal = media;
        }
        if (media.mediaType === 4) {
          this.images.push(media);
        }
      }
    }
  }
}
