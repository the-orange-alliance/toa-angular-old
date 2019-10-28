import { Component, Input, OnInit } from '@angular/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'toa-account-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../account.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() user: User;
  selectedUser: User = null;
  users: User[] = [];
  queriedUsers: User[] = [];
  errorLoading = false;
  query: string;

  adminRegion = 0;
  adminEvent = 1;
  adminTeam = 2;

  addRegion = '';
  addEvent = '';
  addTeam = '';

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Users');
    this.cloud.getAllUsers(this.user.firebaseUser).then((data) => {
      this.users = data;
      this.errorLoading = false;
    }).catch(() => this.errorLoading = true);
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  queryUsers() {
    const query = this.query && this.query.trim().length > 0 ? this.query.toLowerCase().trim() : null;
    if (query) {
      this.queriedUsers = this.users.filter(user => ( String(user.email).includes(query) || String(user.displayName).includes(query)));
    }
  }

  manageAdmin(enable: boolean, type: number, key: string, uidToUpdate: string) {
    let body;
    switch (type) {
      case this.adminRegion: body = {region_key: key, enable: enable}; break;
      case this.adminEvent: body = {event_key: key, enable: enable}; break;
      case this.adminTeam: body = {team_key: key, enable: enable}; break;
      default: return;
    }
    this.cloud.manageAdmin(this.user.firebaseUser, uidToUpdate, body).then(() => {
      // todo show snackbar
      let userIndex;
      for (const i in this.users) {
        if (this.users[i].uid === this.selectedUser.uid) {
          userIndex = i;
          break;
        }
      }
      // Remove entry from list
      if (this.selectedUser && !enable) {
        // Find index of item
        let indexOfItem;
        const listToSearch = (type === this.adminRegion) ? this.selectedUser.adminRegions : (type === this.adminEvent) ? this.selectedUser.individualAdminEvents : this.selectedUser.adminTeams;
        for (const i in listToSearch) {
          if (listToSearch[i] === key) {
            indexOfItem = i;
            break;
          }
        }
        // Remove Item from the lists
        if (type === this.adminRegion) {
          // Remove Item from selected user and full users list
          this.users[userIndex].adminRegions.splice(indexOfItem, 1);
        } else if (type === this.adminEvent) {
          // Remove Item from selected user and full users list
          this.users[userIndex].individualAdminEvents.splice(indexOfItem, 1);
        } else {
          // Remove Item from selected user and full users list
          this.users[userIndex].adminTeams.splice(indexOfItem, 1);
        }
      } else if (this.selectedUser && enable) { // Add Entry to list
        if (type === this.adminRegion) {
          // Add Item from selected user and full users list
          this.users[userIndex].adminRegions.push(key);
          this.addRegion = '';
        } else if (type === this.adminEvent) {
          // Add Item from selected user and full users list
          this.users[userIndex].individualAdminEvents.push(key);
          this.users[userIndex].adminEvents.push(key);
          this.addEvent = '';
        } else {
          // Add Item from selected user and full users list
          this.users[userIndex].adminTeams.push(key);
          this.addTeam = '';
        }
        this.selectedUser = this.users[userIndex];
        console.log(this.selectedUser)
      }
      this.queryUsers(); // Refresh this list with the freshest data
    }).catch((e) => console.log('fail :( ' + e));
  }
}
