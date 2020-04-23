import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = '/api/v1/cars';

  constructor(private http: HttpClient) {
  }

  getCar(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCar(car: object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, car);
  }

  updateCar(id: number, car: object): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  getCarsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
