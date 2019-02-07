import { Component, OnInit } from '@angular/core';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import { AppBarService } from '../../app-bar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'toa-account',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  providers: [TheOrangeAllianceGlobals]
})
export class AddDataComponent implements OnInit {

  constructor(private app: TheOrangeAllianceGlobals, private appBarService: AppBarService,
              private translate: TranslateService) {
    this.app.setTitle('Add Data');
    this.app.setDescription('Manage your favorite teams and events');
  }

  ngOnInit() {
    this.translate.get('pages.add_data.title').subscribe((str: string) => {
      this.appBarService.setTitle(str);
    });
  }

  sendAnalytic(category, label, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: 10
    });
  }
}
