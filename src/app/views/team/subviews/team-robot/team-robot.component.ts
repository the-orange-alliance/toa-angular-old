import { Component, OnInit, Input } from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import Team from '../../../../models/Team';
import Media from '../../../../models/Media';

export class MediaType {
  static GITHUB = 0;
  static CAD = 1;
  static NOTEBOOK = 2;
  static REVEAL = 3;
  static IMAGE = 4;
}

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

  ngOnInit() {
    if (this.team && this.team.media) {
      this.images = [];
      for (const media of this.team.media) {
        if (media.mediaType === MediaType.GITHUB) {
          this.github = media;
        }
        if (media.mediaType === MediaType.CAD) {
          this.cad = media;
        }
        if (media.mediaType === MediaType.NOTEBOOK) {
          this.notebook = media;
        }
        if (media.mediaType === MediaType.REVEAL) {
          this.reveal = media;
        }
        if (media.mediaType === MediaType.IMAGE) {
          this.images.push(media);
        }
      }
    }
  }
}
