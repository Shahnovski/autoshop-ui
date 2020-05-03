import { Car } from '../car';
import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})

export class CarDetailsComponent implements OnInit {
  car: Car = new Car();
  param: string;

  constructor(private route: ActivatedRoute, private carService: CarService) { }

  getCarDetails(id) {
    this.carService.getCar(id).subscribe(
      data => {
        this.car = data;
        console.log(data);
      },
      error => console.log(error));
  }

  ngOnInit() {
    this.param = 'id';
    this.getCarDetails(this.route.snapshot.params[this.param]);
  }

}
