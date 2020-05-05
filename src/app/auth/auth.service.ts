import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private user: Observable<firebase.User>;
	private userDetails: firebase.User = null;

	constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
		this.user = _firebaseAuth.authState;
		this.user.subscribe((user) => {
			if (user) {
				this.userDetails = user;
				console.log(this.userDetails);
			} else {
				this.userDetails = null;
			}
		});
	}

	signInWithGoogle() {
		return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  isLoggedIn() {
    return this.userDetails != null;
  }

	// async isLoggedIn() {
  //   console.log(this.userDetails);

	// 	return new Promise<Boolean>((resolve) => {
	// 		setTimeout(() => {
	// 			resolve(this.userDetails == null);
	// 		}, 1000);
	// 	});
	// }

	logout() {
		this._firebaseAuth.auth
			.signOut()
			.then((res) => {
				window.alert('You have successfully logged out!');
				this.router.navigate(['/']);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	CreateAccount(email: string, password: string) {
		return this._firebaseAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				window.alert('You have successfully registerd!');
				console.log(res.user);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	Login(email: string, password: string) {
		return this._firebaseAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				this.router.navigate(['/']);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}
}
