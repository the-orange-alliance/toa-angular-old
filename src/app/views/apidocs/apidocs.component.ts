import { Component } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser/src/security/dom_sanitization_service';

@Component({
  selector: 'toa-apidocs',
  templateUrl: './apidocs.component.html',
  styleUrls: ['./apidocs.component.scss'],
  providers: [TheOrangeAllianceGlobals]
})
export class ApiDocsComponent {

  docs: any = null;

  constructor(private ftc: FTCDatabase, private app: TheOrangeAllianceGlobals, protected sanitizer: DomSanitizer) {
    this.app.setTitle('API Docs');

    this.ftc.getDocs().then(data => {
      this.docs = data;
    });
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

  getBaseRoutes(tabIndex: number): any[] {
    let response = [];
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
        'title': '/api' + (title.length > 1 && title.endsWith('/') ? title.substr(0, title.length-1) : title),
        'key': title.replace('/', '').toLowerCase(),
        "routes": base[title]
      });
    }
    return response;
  }

  getRouteHTML(route: any): SafeHtml {
    if (!route.route.includes(':')) {
      return route.route;
    } else {
      let toReturn: string = route.route;
      let params = route.params.split('. ');
      for (let param of params) {
        let name: string = param.split(' - ')[0];
        let desc: string = param.split(' - ')[1];
        if (desc.endsWith('.')) {
          desc = desc.substr(0, desc.length-1)
        }
        toReturn = toReturn.replace(':'+name, `<span class="toa-tooltip" style="border-bottom: 1px dotted black">:${name}<span class="tooltiptext">${desc}</span></span>`);
      }
      return this.sanitizer.bypassSecurityTrustHtml(toReturn);
    }
  }

  getRequiredFieldsHTML(route: any): SafeHtml {
    let html = route.required_fields.replace(/"([^"]+)"/g, '<code>$1</code>');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
