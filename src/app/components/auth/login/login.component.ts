import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private route: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    /*
  	const user: UserI ={
  		email: 'bezael@me.com',
  		password: '123456'
  	};
  	this.authSvc.loginByEmail(user);
    */
  }
  onLogin(form: UserI) {
      this.authSvc
      .loginByEmail(form)    
      .then(res => {
      console.log('Succesfully', res);
      this.route.navigate(['/']);
    })
    .catch(err => console.log('Error', err));
  }
}
