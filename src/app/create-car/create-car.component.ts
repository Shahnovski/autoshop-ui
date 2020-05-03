import { CarService } from '../car.service';
import { Car, TypeTransmission, TypeEngine } from '../car';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})

export class CreateCarComponent implements OnInit {
  car: Car = new Car();
  brands: Observable<Brand[]>;
  carForm: FormGroup;
  submitted = false;
  imageSelected = false;
  carImage: Blob;
  typeTransmissionValues: Array<Array<string>> = [];
  typeEngineValues: Array<Array<string>> = [];
  brandTitleValues: Array<[number, string]> = [];

  constructor(private carService: CarService, private brandService: BrandService, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.carForm = this.fb.group({
      brandTitle: ['', Validators.required ],
      carModel: ['', Validators.required ],
      typeTransmission: ['', Validators.required ],
      typeEngine: ['', Validators.required ],
      carMileage: ['', Validators.required, Validators.pattern('^[1-9]\d*$') ],
      cityLocation: ['', Validators.required, Validators.pattern('[A-z]+$') ],
      countryLocation: ['', Validators.required, Validators.pattern('[A-z]+$') ],
      carCost: ['', Validators.required, Validators.pattern('^[0-9]*[.,]?[0-9]+$') ],
      carStatus: ['', Validators.required, Validators.maxLength(15) ]
    });
  }

  initTypeTransmissionValues() {
    for (const item in TypeTransmission) {
      if (TypeTransmission.hasOwnProperty(item)) {
        this.typeTransmissionValues.push([item, TypeTransmission[item]]);
      }
    }
  }

  initTypeEngineValues() {
    for (const item in TypeEngine) {
      if (TypeEngine.hasOwnProperty(item)) {
        this.typeEngineValues.push([item, TypeEngine[item]]);
      }
    }
  }

  ngOnInit(): void {
    this.initTypeEngineValues();
    this.initTypeTransmissionValues();
    this.brands = this.brandService.getBrandList();
    /*this.initBrandTitleValues();*/
  }

  newCar(): void {
    this.submitted = false;
    this.car = new Car();
  }

  save() {
    console.log(this.car);
    this.carService.createCar(this.car).subscribe(
      data => {
        this.car = new Car();
        this.car = data;
      },
      error => console.log(error));
    this.car = new Car();
  }

  onSubmit() {
    this.save();
  }

  handleImageInput(files: FileList) {
    this.imageSelected = true;
    this.carImage = files.item(0);
  }
}
