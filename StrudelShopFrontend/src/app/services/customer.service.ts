import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http); 
  }

  fetchCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customers/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  createCustomer(customer: Customer): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/customers`, customer, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCustomer(id: number, customer: Customer): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/customers/${id}`, customer, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customers/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }
}
