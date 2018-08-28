/**
 * Created by Kevin Fang (TheReddKing) on 12/5/2017.
 */

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TheOrangeAllianceGlobals {
    globalquery : string;

    constructor(private titleService: Title) {
      this.globalquery = "";
    }

    setTitle( newTitle: string) : void {
      // alert("HIELLO");
      this.titleService.setTitle( newTitle + " | The Orange Alliance");
    }
    retrieveGET() : any {
      var $_GET = {},
      args = window.location.search.substr(1).split(/&/);
      console.log(window.location.search);
      for (var i=0; i<args.length; ++i) {
          var tmp = args[i].split(/=/);
          if (tmp[0] != "") {
              $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
              console.log("KEY" + decodeURIComponent(tmp[0]) + " " + decodeURIComponent(tmp.slice(1).join("").replace("+", " ")));
          }
      }
      return $_GET;
    }
  }
