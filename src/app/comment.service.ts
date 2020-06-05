import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = '/api/v1/comments';

  constructor(private http: HttpClient) { }

  getComment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createComment(comment: object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, comment);
  }

  updateComment(id: number, comment: object): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  getCommentList(carId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${carId}`);
  }
}
