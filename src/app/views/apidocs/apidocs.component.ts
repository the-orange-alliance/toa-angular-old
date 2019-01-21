import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MdcTabActivatedEvent } from '@angular-mdc/web';
import { Router } from '@angular/router';

@Component({
  selector: 'toa-apidocs',
  templateUrl: './apidocs.component.html',
  styleUrls: ['./apidocs.component.scss'],
  providers: [TheOrangeAllianceGlobals, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ApiDocsComponent implements AfterViewChecked {

  docs: any = null;
  baseRoutes: any[] = [];
  activeTab = -1;

  constructor(private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals, protected sanitizer: DomSanitizer,
              private cdRef: ChangeDetectorRef, private loca: Location, private router: Router) {
    this.app.setTitle('API Docs');

    this.ftc.getDocs().then(data => {
      this.docs = data;

      console.log(this.router.url);
      if (this.router.url.indexOf('/apidocs/get') > -1) {
        this.activeTab = 0;
        this.getBaseRoutes(0);
      } else if (this.router.url.indexOf('/apidocs/post') > -1) {
        this.activeTab = 1;
        this.getBaseRoutes(1);
      } else if (this.router.url.indexOf('/apidocs/put') > -1) {
        this.activeTab = 2;
        this.getBaseRoutes(2);
      } else if (this.router.url.indexOf('/apidocs/delete') > -1) {
        this.activeTab = 3;
        this.getBaseRoutes(3);
      } else if (this.router.url.indexOf('/apidocs/models') > -1) {
        this.activeTab = 4;
      } else if (this.router.url.indexOf('/apidocs/types') > -1) {
        this.activeTab = 5;
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  stringify(jsonStr): string {
    return JSON.stringify(JSON.parse(jsonStr), null, '\t');
  }

  sendAnalytic(category, label, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: 10
    });
  }

  tabActivated(event: MdcTabActivatedEvent): void {
    this.baseRoutes = this.getBaseRoutes(event.index);
  }

  getBaseRoutes(tabIndex: number): any[] {
    const response = [];
    let base: {} = {};

    switch (tabIndex) {
      case 0:
        base = this.docs.routes.get;
        break;
      case 1:
        base = this.docs.routes.post;
        break;
      case 2:
        base = this.docs.routes.put;
        break;
      case 3:
        base = this.docs.routes.delete;
        break;
    }

    for (const title in base) {
      response.push({
        'title': '/api' + (title.length > 1 && title.endsWith('/') ? title.substr(0, title.length - 1) : title),
        'key': title.replace('/', '').toLowerCase(),
        'routes': base[title]
      });
    }
    return response;
  }

  getRouteHTML(route: any): SafeHtml {
    if (!route.route.includes(':')) {
      return route.route;
    } else {
      let toReturn: string = route.route;
      const params = route.params.split('. ');
      for (const param of params) {
        const name: string = param.split(' - ')[0];
        let desc: string = param.split(' - ')[1];
        if (desc.endsWith('.')) {
          desc = desc.substr(0, desc.length - 1)
        }
        toReturn = toReturn.replace(':' + name, `<span class="toa-tooltip" style="border-bottom: 1px dotted black">:${name}<span class="tooltiptext">${desc}</span></span>`);
      }
      return this.sanitizer.bypassSecurityTrustHtml(toReturn);
    }
  }

  getRequiredFieldsHTML(route: any): SafeHtml {
    const html = route.required_fields.replace(/"([^"]+)"/g, '<code>$1</code>');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  changeUrlNoRoute(route: any) {
    this.loca.go(`apidocs/${route}`);
  }
}
