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

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions) {

  }

  ngOnInit() {
    this.appBarService.setTitle('Users');
    this.cloud.getAllUsers(this.user.firebaseUser).then((data) => {
      this.users = data;
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
