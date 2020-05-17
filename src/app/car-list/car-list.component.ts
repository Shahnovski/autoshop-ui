import {Observable, of} from 'rxjs';
import { CarService } from '../car.service';
import { Car } from '../car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Observable<Car[]>;
  totalElements: number;
  totalPages: number;
  paginationArray: number[];
  pageSizesArray: number[] = [];
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortFields: string[][];
  filters: string[][] = [];
  filterValue: string;
  filterKey: string;

  constructor(private carService: CarService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.totalElements = 0;
    this.totalPages = 0;
    this.pageNumber = 1;
    this.pageSize = 3;
    this.sortBy = 'id';
    this.filterValue = '';
    this.filterKey = 'id';
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

  changeDocsOnPage() {
    this.reloadData();
  }

  changeSortBy() {
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
        console.log(data);
      },
      error => {
        console.log(error);
        if (error.error.code === 401) { this.router.navigate(['/login']); }
      });
  }

}
