import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MdcSnackbar } from '@angular-mdc/web';
import { auth as providers } from 'firebase/app';
import {CloudFunctions} from '../../../providers/cloud-functions';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';

  googleProvider = new providers.GoogleAuthProvider();
  githubProvider = new providers.GithubAuthProvider();

  constructor(private router: Router, public auth: AngularFireAuth, private snackbar: MdcSnackbar,
              private translate: TranslateService) {
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

  signInWithPopup(provider): void {
    this.auth.auth.signInWithPopup(provider).then(result => {
      // The signed-in user info.
      const user = result.user;
      window.location.reload(true);
    }).catch((error) => {
      // Handle Errors here.
      // Show Success
      this.translate.get(`pages.account.subpages.login.no_account_linked`).subscribe((no_acct: string) => {
        this.snackbar.open(no_acct);
      });
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
    });
  }
}
