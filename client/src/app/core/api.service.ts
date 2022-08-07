import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, addCustomer } from '../shared/type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
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
}
