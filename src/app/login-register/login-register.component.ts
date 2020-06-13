import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  loginForm: FormGroup;
  registerForm: FormGroup;

  ngOnInit() {

    if(localStorage.getItem('userId'))
      return this.router.navigateByUrl('/home');

    this.loginForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    const loginDetails = this.loginForm.value;
    const { userId } = loginDetails;

    this.userService.login(loginDetails).subscribe(response => {
      if(response['message']) {
        localStorage.setItem("userId",userId);
        this.router.navigateByUrl('/home');
      }
        
      else 
        alert(response.toString());
    });

  }

  register() {
    const registerDetails = this.registerForm.value;
    this.userService.register(registerDetails).subscribe(response => {
      console.log(response);
      if(response['message']) {
        alert('Registered successfully..');
      } else {
        alert(response.toString());
      }      
    });
  }

}
