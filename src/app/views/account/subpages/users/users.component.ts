import { Component, Input, OnInit } from '@angular/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import User from '../../../../models/User';

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
}
