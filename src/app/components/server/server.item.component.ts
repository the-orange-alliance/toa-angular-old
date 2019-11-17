import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FTCDatabase } from '../../providers/ftc-database';
import { CloudFunctions, Service } from '../../providers/cloud-functions';
import TOAUser from '../../models/User';
import mdcInfo from '../../../../node_modules/@angular-mdc/web/package.json'
import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  selector: 'toa-server',
  templateUrl: './server.item.component.html',
})
export class ServerItemComponent implements OnInit {

  @Input() user: TOAUser;

  services = Service;
  serverData: [];
  server: { 'is_dev': boolean, 'last_commit': string, 'build_time': string, 'api_version': string, 'mdc_version': string } = {
    'is_dev': false,
    'last_commit': null,
    'build_time': null,
    'api_version': null,
    'mdc_version': null
  };


  constructor(private ftc: FTCDatabase, private cloud: CloudFunctions, private nackbar: MdcSnackbar) { }

  ngOnInit() {
    this.cloud.getPm2Data(this.user.firebaseUser).then( data => {
      this.serverData = data;
    }).catch(() => null);
    this.ftc.getApiVersion().then((version: string) => {
      this.server.api_version = version;
    });
    this.server.is_dev = !environment.production;
    if (!this.server.is_dev) {
      this.server.last_commit = environment.commit;

      const d = new Date(environment.build_time);
      const dateString = // 2019/02/24 16:03:57
        d.getUTCFullYear() + '/' +
        ('0' + (d.getUTCMonth() + 1)).slice(-2) + '/' +
        ('0' + d.getUTCDate()).slice(-2) + ' ' +
        ('0' + d.getUTCHours()).slice(-2) + ':' +
        ('0' + d.getUTCMinutes()).slice(-2) + ':' +
        ('0' + d.getUTCSeconds()).slice(-2);
      this.server.build_time = dateString;
    }
    this.server.mdc_version = mdcInfo.version;
  }

  updateService(service: Service) {
    this.cloud.update(this.user.firebaseUser, service).then(() => {
      this.nackbar.open('Restarted.');
    });
  }

  calculateUptime(unixTime): any {
    // get total seconds between the times
    let delta = Math.abs(new Date().getTime() - unixTime) / 1000;
    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    const seconds = delta % 60;  // in theory the modulus is not required
    return `${days} day${(days === 1) ? '' : 's'}, ${hours} hour${(hours === 1) ? '' : 's'}, and ${minutes} minute${(minutes === 1) ? '' : 's'}`;
  }
}
