import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Customer } from '../shared/type';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  showNotification = false;
  reAssuDel?: boolean;
  delId!: number;

  customerForm = new FormGroup({
    first_name: new FormControl('', { validators: Validators.required }),
    last_name: new FormControl('', { validators: Validators.required }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.minLength(9)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.error(err),
    });
  }

  onSubmit() {
    this.apiService.addCustomers(this.customerForm.value).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
      },
      error: (err) => console.log(err),
    });
  }

  notificationRespon(respon: boolean) {
    if (respon) {
      this.delCustomer(this.delId);
    } else {
      this.showNotification = false;
    }
  }

  delCustomer(id: number) {
    this.showNotification = true;
    this.apiService.deleteCustomer(id).subscribe({
      next: () => {
        this.getCustomers();
        this.showNotification = false;
      },
      error: (err) => console.log(err),
    });
  }
}
