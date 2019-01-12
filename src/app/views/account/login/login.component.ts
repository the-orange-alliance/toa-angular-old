import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private router: Router, public auth: AngularFireAuth, private snackbar: MdcSnackbar) {
    auth.authState.subscribe(user => {
      if (user !== null) {
        this.router.navigateByUrl('/account');
      }
    });
  }

  ngOnInit() {
  }

  onLoginEmail(): void {
    this.auth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        // To update the data in the menu
        // After the refresh, it will go to the account page through the function above(auth.authState.subscribe)
        window.location.reload(true);
        // this.router.navigateByUrl('/account');
      })
      .catch(error => {
        this.snackbar.open(error.toString());
      });
  }
}
