import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  username: string;
  password: string;

  @Output() public outToParent = new EventEmitter();

  incorrectRegData: boolean;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.createForm();
    this.incorrectRegData = false;
  }

  createForm() {
    this.regForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.authService.setUserLoggedIn(false);
  }

  onSubmit(){}

  registration(){
    this.authService.registration(this.username, this.password).subscribe(
      data => {
        if (data.status === 'ok') {
          this.router.navigate(['login']);
        }
        else {
          this.incorrectRegData = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
