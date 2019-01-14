import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdcSnackbar } from '@angular-mdc/web';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  team = '';

  constructor(public router: Router, public snackbar: MdcSnackbar,
              public db: AngularFireDatabase, public auth: AngularFireAuth) {
    auth.authState.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['/account']);
      }
    });
  }

  ngOnInit() {

  }

  createUser(): void {
    if (!this.name || this.name.trim().length < 4) {
      this.snackbar.open('You forgot to type your FULL NAME.');
    } else if (this.password != this.confirmPassword) {
      this.snackbar.open('Those passwords didn\'t match. Try again.');
    } else {
      this.auth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          let data = {};
          data['fullName'] = this.name;
          if (this.team && this.name.trim().length > 0) {
            data['team'] = this.team;
          }
          this.db.object(`Users/${user.user.uid}`).set(data).then(value => {
            user.user.sendEmailVerification().then(function(){
                //sent
            }).catch(function(error){
                //an error occured
            })
            // To update the data in the menu
            // After the refresh, it will go to the account page through the function above(auth.authState.subscribe)
            window.location.reload(true);
          });
        })
        .catch(error => {
          this.snackbar.open(error.toString());
        });
    }
  }
}
