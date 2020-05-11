import { CarService } from '../car.service';
import { Car, TypeTransmission, TypeEngine } from '../car';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  car: Car = new Car();
  brands: Observable<Brand[]>;
  carForm: FormGroup;
  typeTransmissionValues: Array<Array<string>> = [];
  typeEngineValues: Array<Array<string>> = [];
  myReader: FileReader = new FileReader();
  param: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private brandService: BrandService,
              private fb: FormBuilder) {
    this.param = 'id';
    this.createForm();
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

  getCarDetails(id) {
    this.carService.getCar(id).subscribe(
      data => {
        this.car = data;
        console.log(data);
      },
      error => console.log(error));
  }

  createForm() {
    this.carForm = this.fb.group({
      id: [this.route.snapshot.params[this.param], Validators.required ],
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

  ngOnInit(): void {
    this.initTypeEngineValues();
    this.initTypeTransmissionValues();
    this.brands = this.brandService.getBrandList();
    this.getCarDetails(this.route.snapshot.params[this.param]);
  }

  updateCar() {
    this.carService.updateCar(this.route.snapshot.params[this.param], this.car)
      .subscribe(data => {
        this.router.navigate(['cars']);
      }, error => console.log(error));
  }

  handleImageInput(files: FileList) {
    this.myReader.onloadend = (e) => {
      this.car.carImage = this.myReader.result.toString().slice(23);
    };
    this.myReader.readAsDataURL(files.item(0));
  }

}
