import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'autoshop-ui';

  isUserLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUserInfo();
    this.authService.isUserLoggedIn.subscribe((userLoggedIn: boolean) => {
      this.isUserLoggedIn = userLoggedIn;
    });
  }

  public logout() {
    this.authService.logout().subscribe(
      data => {
        if (data.status === 'ok') {
          this.isUserLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          console.log('Logout error, details: ' + data.details);
        }
      }, error => {
        console.log(error);
      });

  }

  getUserInfo() {
    this.authService.getUserInfo().subscribe(
      data => {
        this.isUserLoggedIn = true;
      }, error => {
        console.log(error);
        this.isUserLoggedIn = false;
      });
  }
}
