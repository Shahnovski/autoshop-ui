import {Observable, of} from 'rxjs';
import { CarService } from '../car.service';
import {Car, TypeEngine, TypeTransmission} from '../car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Brand} from '../brand';
import {BrandService} from '../brand.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Observable<Car[]>;
  brands: Observable<Brand[]>;
  totalElements: number;
  totalPages: number;
  paginationArray: number[];
  pageSizesArray: number[] = [];
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortFields: string[][];
  filters: string[][] = [];
  filterCarCost: string;
  filterTypeTransmission: string;
  filterTypeEngine: string;
  filterOwner: string;
  filterBrand: string;
  listOfCosts: number[];
  listOfOwns: Array<Array<string>> = [];
  typeTransmissionValues: Array<Array<string>> = [];
  typeEngineValues: Array<Array<string>> = [];

  constructor(private carService: CarService,
              private brandService: BrandService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.totalElements = 0;
    this.totalPages = 0;
    this.pageNumber = 1;
    this.pageSize = 3;
    this.sortBy = 'id';
    this.listOfCosts = [0, 5000, 10000, 15000, 20000];
    this.listOfOwns = [['ALL', 'All advertisements'], ['MY', 'Only my advertisements']];
    this.brands = this.brandService.getBrandList();
    this.setDefaultFilterValues();
    this.initPageSizesArray();
    this.initSortFields();
    this.initTypeEngineValues();
    this.initTypeTransmissionValues();
    this.reloadData();
  }

  initSortFields() {
    this.sortFields = [
      ['id', 'None'],
      ['brandId', 'Brand'],
      ['carCost', 'Car cost']
    ];
  }

  initPaginationArray() {
    this.paginationArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.paginationArray.push(i);
    }
  }

  initPageSizesArray() {
    const start = 3;
    const step = 3;
    const max = 15;
    for (let i = start; i <= max; i += step) {
      this.pageSizesArray.push(i);
    }
  }

  initTypeTransmissionValues() {
    this.typeTransmissionValues.push(['ALL', 'All']);
    for (const item in TypeTransmission) {
      if (TypeTransmission.hasOwnProperty(item)) {
        this.typeTransmissionValues.push([item, TypeTransmission[item]]);
      }
    }
  }

  initTypeEngineValues() {
    this.typeEngineValues.push(['ALL', 'All']);
    for (const item in TypeEngine) {
      if (TypeEngine.hasOwnProperty(item)) {
        this.typeEngineValues.push([item, TypeEngine[item]]);
      }
    }
  }

  setDefaultFilterValues() {
    this.filterCarCost = '0';
    this.filterTypeTransmission = 'ALL';
    this.filterTypeEngine = 'ALL';
    this.filterOwner = 'ALL';
    this.filterBrand = 'ALL';
  }

  changeCarsOnPage() {
    this.pageNumber = 1;
    this.reloadData();
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.reloadData();
  }

  changePageToNext() {
    if (this.pageNumber !== this.paginationArray.length) {
      this.pageNumber = this.pageNumber + 1;
      this.reloadData();
    }
  }

  changePageToPrev() {
    if (this.pageNumber !== 1) {
      this.pageNumber = this.pageNumber - 1;
      this.reloadData();
    }
  }

  addFilter(filterKey: string, filterValue: string) {
    const index = this.findFilterByRey(filterKey);
    if (index !== -1) {
      this.filters.splice(index, 1);
    }
    if (filterValue !== 'ALL') {
      this.filters.push([filterKey, filterValue]);
    }
  }

  deleteAllFilters() {
    this.setDefaultFilterValues();
    this.filters = [];
    this.pageNumber = 1;
    this.reloadData();
  }

  findFilterByRey(key: string): number {
    for (let i = 0; i < this.filters.length; i++) {
      if (this.filters[i][0] === key) {
        return i;
      }
    }
    return -1;
  }

  reloadData() {
    if (this.pageNumber == null) {
      this.pageNumber = 1;
    }
    this.carService.getCarsList(this.pageNumber - 1, this.pageSize, this.sortBy, this.filters).subscribe(
      data => {
        this.cars = data.cars;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.initPaginationArray();
      },
      error => {
        console.log(error);
        if (error.error.code === 401) { this.router.navigate(['/login']); }
      });
  }

}
