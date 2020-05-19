import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  incorrectLoginData: boolean;
  username: string;
  password: string;

  @Output() public outToParent = new EventEmitter();

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.createForm();
    this.incorrectLoginData = false;
  }

  ngOnInit(): void {
    this.incorrectLoginData = false;
    this.authService.setUserLoggedIn(false);
  }

  onSubmit() {
    this.login();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  login(){
    this.incorrectLoginData = false;
    this.authService.login(this.username, this.password).subscribe(
      data => {
        console.log(JSON.stringify(data));
        if (data.status === 'ok') {
          this.authService.setUserLoggedIn(true);
          this.router.navigate(['cars']);
        }
        else {
          this.incorrectLoginData = true;
        }
      },
      error => {
        console.log(error);
      });
  }

}
