import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Customer,
  addCustomer,
  Login,
  User,
  RegisterUser,
} from '../shared/type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';

  setToken(value: string) {
    this.token = value;
  }

  constructor(private http: HttpClient) {}

  getCustomersList(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers`);
  }

  addCustomers(customer: addCustomer): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.serverUrl}/customers`,
      customer,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(
      `${environment.serverUrl}/customers?id=${id}`
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${environment.serverUrl}/customers`,
      customer,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  login(details: Login): Observable<User> {
    return this.http.post<User>(`${environment.serverUrl}/login`, details, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }

  register(user: RegisterUser): Observable<User> {
    return this.http.post<User>(`${environment.serverUrl}/register`, user, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }
}
