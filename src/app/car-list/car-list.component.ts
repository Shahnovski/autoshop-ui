import { Observable } from 'rxjs';
import { CarService } from '../car.service';
import { Car } from '../car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Observable<Car[]>;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.carService.getCarsList().subscribe(
      data => {
        this.cars = data;
      },
      error => {
        console.log(error);
      });
  }

}
