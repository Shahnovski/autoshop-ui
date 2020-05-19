import { Car } from '../car';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})

export class CarDetailsComponent implements OnInit {
  car: Car = new Car();
  param: string;
  roles: string;
  currentUserId: number;
  flagOfEditAndDelite: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private authService: AuthService) { }

  getCarDetails(id) {
    this.carService.getCar(id).subscribe(
      data => {
        this.car = data;
        console.log(data);
        this.checkEditRight();
      },
      error => console.log(error));
  }

  checkEditRight() {
    if (this.roles.indexOf('ADMIN') !== -1 || this.currentUserId === this.car.ownerId) {
      console.log(this.roles.indexOf('ADMIN'));
      this.flagOfEditAndDelite = true;
    }
  }

  ngOnInit() {
    this.param = 'id';
    this.flagOfEditAndDelite = false;
    this.getCarDetails(this.route.snapshot.params[this.param]);
    this.authService.getUserInfo().subscribe(
      data => {
        this.roles = data.roles;
        this.currentUserId = data.id;
        this.checkEditRight();
      });
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['cars']);
        },
        error => console.log(error));
  }

}
