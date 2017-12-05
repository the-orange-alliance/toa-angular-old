/**
 * Created by Kevin Fang (TheReddKing) on 12/5/2017.
 */

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TheOrangeAllianceGlobals {

    constructor(private titleService: Title) {
    }
    setTitle( newTitle: string) : void {
      // alert("HIELLO");
      this.titleService.setTitle( newTitle + " | The Orange Alliance");
    }
}
