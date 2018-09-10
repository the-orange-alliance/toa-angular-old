/**
 * Created by Kevin Fang (TheReddKing) on 12/5/2017.
 */

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TheOrangeAllianceGlobals {
    globalquery: string;

    constructor(private titleService: Title) {
      this.globalquery = '';
    }

    setTitle( newTitle: string): void {
      this.titleService.setTitle( newTitle + ' | The Orange Alliance');
    }

    retrieveGET(): any {
      const $_GET = {},
      args = window.location.search.substr(1).split(/&/);
      for (let i = 0; i < args.length; i++) {
          const tmp = args[i].split(/=/);
          if (tmp[0].length === 0) {
              $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join('').replace('+', ' '));
          }
      }
      return $_GET;
    }
  }
