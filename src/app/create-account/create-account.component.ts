import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  private user: Observable<firebase.User>;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private authService: AuthService) {
    this.user = _firebaseAuth.authState
   }

  submitNewAccount(value: any) {
    if (this.authService.isLoggedIn() == true) {
      window.alert('You are already logged in');
    } else {
      if (value.password == value.confirmPassword) {
        this.authService.CreateAccount(value.email, value.password);
      } else {
        window.alert('Passwords do not match');
      }
    }
  }
  

  ngOnInit() {
  }

}
