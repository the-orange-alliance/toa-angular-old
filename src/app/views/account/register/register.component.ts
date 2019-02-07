import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdcSnackbar } from '@angular-mdc/web';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../app-bar.service';

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

  constructor(public router: Router, public snackbar: MdcSnackbar, private appBarService: AppBarService,
              public db: AngularFireDatabase, public auth: AngularFireAuth, private translate: TranslateService) {
    auth.authState.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['/account']);
      }
    });
  }

  ngOnInit() {
    this.translate.get(`pages.account.subpages.register.title`).subscribe((str: string) => {
      this.appBarService.setTitle('myTOA - ' + str, true);
    });
  }

  createUser(): void {
    if (!this.name || this.name.trim().length < 4) {
      this.snackbar.open('You forgot to type your FULL NAME.');
    } else if (this.password !== this.confirmPassword) {
      this.snackbar.open('Those passwords didn\'t match. Try again.');
    } else {
      this.auth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          user.user.updateProfile({displayName: this.name, photoURL: null}).then(() => {}).catch(error => console.log(error));
          const data = {};
          data['fullName'] = this.name;
          if (this.team && this.name.trim().length > 0) {
            data['team'] = this.team;
          }
          this.db.object(`Users/${user.user.uid}`).set(data).then(value => {
            user.user.sendEmailVerification().then(() => {
              // Show success in snackbar
              this.translate.get(`pages.event.subpages.admin.success_sent_verify_email`).subscribe((res: string) => {
                this.snackbar.open(res)
              });

            }).catch((error) => {
              // Show Error in snackbar
              this.translate.get(`general.error_occurred`).subscribe((res: string) => {
                console.log(error);
                this.snackbar.open(res + ' (HTTP-500)')
              });

            });
          });
        })
        .catch(error => {
          this.snackbar.open(error.toString());
        });
    }
  }
}
