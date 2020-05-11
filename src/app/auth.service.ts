import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private mainUrl = '/api/v1';
  private authUrl = this.mainUrl + '/auth';
  private registrationUrl = this.mainUrl + '/registration';
  private logoutUrl = this.mainUrl + '/logout';
  private authInfoUrl = this.mainUrl + '/auth-info';

  public isUserLoggedIn = new Subject();

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7'
  });

  constructor(private http: HttpClient, private tokenExtractor: HttpXsrfTokenExtractor) { }

  setUserLoggedIn(loggedIn: boolean) {
    this.isUserLoggedIn.next(loggedIn);
  }

  login(login: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', login);
    body.set('password', password);
    return this.http.post(`${this.authUrl}`, body.toString(), { headers: this.headers, withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.logoutUrl}`, '', {headers: this.headers, withCredentials: true });
  }

  registration(login: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', login);
    body.set('password', password);
    return this.http.post(`${this.registrationUrl}`, body.toString(), { headers: this.headers, withCredentials: true });
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.authInfoUrl}`, {headers: this.headers, withCredentials: true });
  }

}
