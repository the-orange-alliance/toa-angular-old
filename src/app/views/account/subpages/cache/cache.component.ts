import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from "../../../../providers/cloud-functions";
import {MdcSnackbar, MdcTextField} from "@angular-mdc/web";
import TOAUser from "../../../../models/User";
import {TranslateService} from "@ngx-translate/core";
import {FTCDatabase} from "../../../../providers/ftc-database";

@Component({
  selector: 'toa-account-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['../../account.component.scss']
})
export class CacheComponent implements OnInit {

  @Input() user: TOAUser;

  @ViewChild('eventCache') eventCache: MdcTextField;
  @ViewChild('teamCache') teamCache: MdcTextField;
  @ViewChild('matchCache') matchCache: MdcTextField;
  generalCache: string = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions, private snackbar: MdcSnackbar, private translate: TranslateService,
              private ftc: FTCDatabase) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Retriever');
    this.cloud.eventsRetriever(this.user.firebaseUser).then((events) => {
      console.log(events);
    });
  }

  dumpGeneralCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    const user = this.user.firebaseUser;
    this.cloud.dumpCache(user, this.generalCache).then(() => {
      // Show Success
      this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
        this.snackbar.open(str);
      });
    }).catch((err) => {
      // Show Fail
      console.log(err);
      this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
    });
  }

  dumpEventCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    const key: string = this.eventCache.value;
    if (key && key.length > 0) {
      const user = this.user.firebaseUser;
      Promise.all([
        this.cloud.dumpCache(user, `event/${key}`),
        this.cloud.dumpCache(user, `event/${key}/matches`),
        this.cloud.dumpCache(user, `event/${key}/matches/details`),
        this.cloud.dumpCache(user, `event/${key}/matches/participants`),
        this.cloud.dumpCache(user, `event/${key}/rankings`),
        this.cloud.dumpCache(user, `event/${key}/streams`),
        this.cloud.dumpCache(user, `event/${key}/teams`),
        this.cloud.dumpCache(user, `event/${key}/awards`),
        this.cloud.dumpCache(user, `event/${key}/media`)
      ]).then(() => {
        // Show Success
        this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
          this.snackbar.open(str);
        });
      }).catch((err) => {
        // Show Fail
        console.log(err);
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('general.error_occurred', 'NULL-KEY');
    }
  }

  dumpTeamCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    const key: string = this.teamCache.value;
    if (key && key.length > 0) {
      const user = this.user.firebaseUser;
      const promises = [
        this.cloud.dumpCache(user, `team/${key}`),
        this.cloud.dumpCache(user, `team/${key}/wlt`)
      ];
      for (const season of this.ftc.allYears) {
        promises.push(this.cloud.dumpCache(user, `team/${key}/events/${season}`));
        promises.push(this.cloud.dumpCache(user, `team/${key}/matches/${season}`));
        promises.push(this.cloud.dumpCache(user, `team/${key}/awards/${season}`));
        promises.push(this.cloud.dumpCache(user, `team/${key}/results/${season}`));
        promises.push(this.cloud.dumpCache(user, `team/${key}/media/${season}`));
      }
      Promise.all(promises).then(() => {
        // Show Success
        this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
          this.snackbar.open(str);
        });
      }).catch((err) => {
        // Show Fail
        console.log(err);
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('general.error_occurred', 'NULL-KEY');
    }
  }

  dumpMatchCache(): void {
    this.showSnackbar('Starting, it may take a few seconds');
    const key: string = this.matchCache.value;
    if (key && key.length > 0) {
      const user = this.user.firebaseUser;
      Promise.all([
        this.cloud.dumpCache(user, `match/${key}`),
        this.cloud.dumpCache(user, `match/${key}/details`),
        this.cloud.dumpCache(user, `match/${key}/participants`)
      ]).then(() => {
        // Show Success
        this.translate.get('pages.account.dump_cache.success').subscribe((str) => {
          this.snackbar.open(str);
        });
      }).catch((err) => {
        // Show Fail
        console.log(err);
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    } else {
      this.showSnackbar('general.error_occurred', 'NULL-KEY');
    }
  }

  showSnackbar(translateKey: string, errorKey?: string) {
    this.translate.get(translateKey).subscribe((res: string) => {
      this.snackbar.open(errorKey ? `${res} (${errorKey})` : res);
    });
  }
}
