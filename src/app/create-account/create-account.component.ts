import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor() { }

  submitNewAccount(value: any) {
    firebase.auth()createUserWithEmailAndPassword(email, password).catch(function(error){
      var errorCode = error.code;
      var errormessage = error.message;
    })
    console.log(value);
  }

  ngOnInit() {
  }

}
