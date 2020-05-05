import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	createAccountElem = `<a class='create-account' href='./create-account'>Create Account</a>`;
	loginElem = `<a class='login' href='./login'>Login</a>`;
	logoutElem = `<button class='logout' (click)='logout()'>Logout</button>`;

	isLoggedIn: Boolean = false;

	constructor(private authService: AuthService, private elementReference: ElementRef) {}

	async ngOnInit() {
		this.CheckLoggedIn()
	}

	async CheckLoggedIn() {
		this.isLoggedIn = this.authService.isLoggedIn();
	}

	logout() {
		this.authService.logout();
	}
}
