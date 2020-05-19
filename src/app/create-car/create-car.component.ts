import { CarService } from '../car.service';
import { Car, TypeTransmission, TypeEngine } from '../car';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  typeTransmissionValues: Array<Array<string>> = [];
  typeEngineValues: Array<Array<string>> = [];
  myReader: FileReader = new FileReader();
  rightTypeFile: boolean;

  constructor(private carService: CarService,
              private brandService: BrandService,
              private fb: FormBuilder,
              private router: Router) {

    this.createForm();
  }

  createForm() {
    this.carForm = this.fb.group({
      brandId: ['', Validators.required ],
      carModel: ['', Validators.required ],
      typeTransmission: ['', Validators.required ],
      typeEngine: ['', Validators.required ],
      carMileage: ['', [Validators.required, Validators.pattern('^[1-9]\\d*$')] ],
      cityLocation: ['', [Validators.required, Validators.pattern('^[A-z\\s-]+$')] ],
      countryLocation: ['', [Validators.required, Validators.pattern('^[A-z\\s-]+$')] ],
      carCost: ['', [Validators.required, Validators.pattern('^[0-9]*[.,]?[0-9]+$')] ],
      carStatus: ['', [Validators.required, Validators.maxLength(15)] ]
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
  }

  save() {
    console.log(this.car);
    this.carService.createCar(this.car).subscribe(
      data => {
        this.car = new Car();
        this.car = data;
        this.car = new Car();
        this.router.navigate(['cars']);
      },
      error => console.log(error));
  }

  onSubmit() {
    this.save();
  }

  handleImageInput(files: FileList) {
    this.rightTypeFile = (files.item(0).type === 'image/jpeg');
    this.myReader.onloadend = (e) => {
      this.car.carImage = this.myReader.result.toString().slice(23);
    };
    this.myReader.readAsDataURL(files.item(0));
    this.imageSelected = true;
  }
}


