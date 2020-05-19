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

  getCarsList(page: number, size: number, sortBy: string, filters: string[][]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    });
    const body = new URLSearchParams();
    body.set('page', page.toString());
    body.set('size', size.toString());
    body.set('sort', sortBy);
    body.set('filter', JSON.stringify(filters).toString());
    console.log(`${this.baseUrl}` + '?' + body.toString());
    return this.http.get(`${this.baseUrl}` + '?' + body.toString(), { headers, withCredentials: true });
  }
}
