import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = '/api/v1/brands';

  constructor(private http: HttpClient) {
  }

  getBrand(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBrand(brand: object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, brand);
  }

  updateBrand(id: number, brand: object): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  getBrandList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
