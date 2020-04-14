import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: Observable<firebase.User>;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private authService: AuthService) {
    this.user = _firebaseAuth.authState

   }

  async submitLogin(value: any) {
    if (this.authService.isLoggedIn() == true) {
      window.alert('You are already logged in')
    } else {
      this.authService.Login(value.email, value.password);
    }
  }

  ngOnInit() {
  }

}
