import { WINDOW } from '@ng-toolkit/universal';
import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../app-bar.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MdcSnackbar } from '@angular-mdc/web';
import { auth as providers } from 'firebase/app';
import {isBrowser} from '@angular/animations/browser/src/render/shared';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';

  googleProvider = new providers.GoogleAuthProvider();
  githubProvider = new providers.GithubAuthProvider();

  constructor(@Inject(WINDOW) private window: Window, private router: Router, public auth: AngularFireAuth, private snackbar: MdcSnackbar,
              private translate: TranslateService, private appBarService: AppBarService, @Inject(PLATFORM_ID) private platformId: Object) {
    auth.authState.subscribe(user => {
      if (user !== null) {
        this.router.navigateByUrl('/account');
      }
    });
  }

  ngOnInit() {
    this.translate.get(`pages.account.subpages.login.title`).subscribe((str: string) => {
      this.appBarService.setTitle('myTOA - ' + str, true);
    });
  }

  onLoginEmail(): void {
    this.auth.auth.signInWithEmailAndPassword(this.email, this.password).catch(error => {
      this.snackbar.open(error.toString());
    });
  }

  signInWithPopup(provider): void {
    this.auth.auth.signInWithPopup(provider).then(result => {
      // The signed-in user info.
      const user = result.user;
      if (isPlatformBrowser(this.platformId)) {
        this.window.location.reload(true);
      }
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

  sendPasswordResetEmail() {
    this.auth.auth.sendPasswordResetEmail(this.email).then( () => {
      // Show success in snackbar
      this.translate.get('pages.account.reset_password_email').subscribe((res: string) => {
        this.snackbar.open(res)
      });
    }).catch( error => {
      // Show the error in snackbar
      this.snackbar.open(error)
    })
  }

}
