import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  createAccountElem = `<a class='create-account' href='./create-account'>Create Account</a>`;
  loginElem = `<a class='login' href='./login'>Login</a>`;
  logoutElem = `<button class='logout' (click)='logout()'>Logout</button>`

  
  constructor(private authService: AuthService, private elementReference: ElementRef) {}
  
  ngOnInit() {
    // let account = this.elementReference.nativeElement.querySelector('.account');
    // if (this.authService.isLoggedIn()) {
    //   let createAccount = this.elementReference.nativeElement.querySelector('.create-account');
    //   let login = this.elementReference.nativeElement.querySelector('.login');
    //   account.removeChild(createAccount);
    //   account.removeChild(login);
    //   account.innerHTML = this.logoutElem;
    // } else {
    //   let logout = this.elementReference.nativeElement.querySelector('.logout');
    //   account.removeChild(logout);
    //   account.innerHTML = this.createAccountElem + this.loginElem;
    // }
  }

  logout() {
    this.authService.logout();
  }

}
