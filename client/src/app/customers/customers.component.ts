import { Component, OnInit, Renderer2 } from '@angular/core';
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
  customer: Customer = {
    id: -1,
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
  };
  showNotification = false;
  reAssuDel?: boolean;
  delId!: number;
  row?: number;
  isValid = false;
  editCustomerId = -1;
  currentForm?: FormGroup;
  header?: string | null;

  customerForm = new FormGroup({
    id: new FormControl(-1, {
      validators: Validators.required,
    }),
    first_name: new FormControl('a', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    last_name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCustomers();
    this.header = localStorage.getItem('email');
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.error(err),
    });
  }

  updateCustomer() {
    this.apiService.updateCustomer(this.customer).subscribe({
      next: () => {
        this.getCustomers();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //refresh table after adding new customer
  refresh(state: boolean) {
    if (state) {
      this.getCustomers();
    }
  }

  //Update row
  confirmEdit() {
    this.customer = {
      id: this.editCustomerId,
      first_name: this.customerForm.get('first_name')?.value,
      last_name: this.customerForm.get('last_name')?.value,
      phone: this.customerForm.get('phone')?.value,
      email: this.customerForm.get('email')?.value,
    };
    this.updateCustomer();

    this.row = -1;
    this.customer = {
      id: -1,
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
    };
    this.getCustomers();
  }

  //open notification for validation delete
  notificationRespon(respon: boolean) {
    if (respon) {
      this.delCustomer(this.delId);
    } else {
      this.showNotification = false;
    }
  }

  //delete action
  delCustomer(id: number) {
    this.apiService.deleteCustomer(id).subscribe({
      next: () => {
        this.getCustomers();
        this.showNotification = false;
      },
      error: (err) => console.log(err),
    });
  }

  openRow(i: number) {
    if (this.row === i) {
      return true;
    }
    return false;
  }

  //choose row to edit
  editRow(customer: Customer, i: number) {
    this.editCustomerId = customer.id;
    this.row = i;
    this.currentForm = this.customerForm;

    for (let key in this.customerForm.value) {
      this.checkData(key);
    }

    this.customerForm.patchValue({
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
    });
  }

  //Checking the data that is clicked for validation
  checkData(key: string) {
    this.customerForm.get(key)?.valueChanges.subscribe(() => {
      if (this.customerForm.get(key)?.valid) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    });
  }
}
