import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected apiUrl: string = 'https://localhost:5000/api';

  constructor(protected http: HttpClient) { }

  protected getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ? token : ''}` 
      })
    };
  }

  protected handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
