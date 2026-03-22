import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { ROUTES } from '../models/routes-model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router, private dialog: MatDialog) { }

  private showDialog(message: string) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Notice', message }
    });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      localStorage.setItem('token', 'true'); //na vrw tropo na to xrhsimopoiw me allon tropo giati ginetai exposed
      this.router.navigate([ROUTES.HOME]);
    }).catch(err => {
      this.showDialog(err.message);
    });
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then(() => {
      signOut(this.auth);
      this.showDialog('Registration successful');
      this.router.navigate([ROUTES.LOGIN]);
    }).catch(err => {
      this.showDialog(err.message);
    });
  }

  private logoutDialog() {
    return this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Logout', message: 'Are you sure you want to logout?', confirm: true }
    });
  }

  logout() {
    this.logoutDialog().afterClosed().subscribe(result => {
      if (result) {
        signOut(this.auth).then(() => {
          this.router.navigate([ROUTES.LOGIN]);
        }).catch(err => {
          this.showDialog(err.message);
        });
      }
    });
  }
}