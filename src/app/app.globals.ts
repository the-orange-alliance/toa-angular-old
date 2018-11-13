import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class TheOrangeAllianceGlobals {

  constructor(private titleService: Title, private meta: Meta) {

  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle( newTitle + ' | The Orange Alliance');
  }

  setDescription(newDescription: string): void {
    this.meta.addTags(
      [
          {
            name: 'description',
            content: newDescription
          },
          {
            name: 'og:description',
            content: newDescription
          }
        ]
    );
  }
}
