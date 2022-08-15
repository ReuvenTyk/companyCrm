import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../core/api.service';
import { Customer, addCustomer } from '../shared/type';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  customer!: Customer;
  showNotification = false;
  reAssuDel?: boolean;
  delId!: number;
  showEdit = true;
  isDisabled = true;
  isValid = true;
  editCustomerId = -1;

  customerForm = new FormGroup({
    id: new FormControl('', { validators: Validators.required }),
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
      validators: Validators.required,
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.minLength(9)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  constructor(private apiService: ApiService, private renderer: Renderer2) {}

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

  /*  updateCustomer(customer: Customer, id: number) {
    this.apiService.updateSingleCustomer(customer, id).subscribe({
      next: () => {
        console.log('updated');
      },
      error: (err) => console.error(err),
    });
  } */

  //refresh table after adding new customer
  refresh(state: boolean) {
    if (state) {
      this.getCustomers();
    }
  }

  //Update row
  onSubmit() {
    /*  
    if (this.customer.valid) {
      console.log('valid');
    } else {
      console.log('invalid');
    }
    console.log(newCustomer);
 */
    this.stopEdit(this.editCustomerId);
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
    this.showNotification = true;
    this.apiService.deleteCustomer(id).subscribe({
      next: () => {
        this.getCustomers();
        this.showNotification = false;
      },
      error: (err) => console.log(err),
    });
  }

  //choose row to edit
  editRow(id: number) {
    this.showEdit = true;

    this.customers.find((c) => (c.id === id ? (this.customer = c) : ''));

    //unchoose row
    if (this.editCustomerId != id && this.editCustomerId != -1) {
      for (let i = 1; i < 5; i++) {
        const oldElem = this.getElem(`t${i}${this.editCustomerId}`);
        this.changeFromEdit(oldElem);
      }
    }

    this.editCustomerId = id;
    for (let i = 1; i < 5; i++) {
      const newElem = this.getElem(`t${i}${id}`);
      this.changeToEdit(newElem);
    }
    for (let key in this.customer) {
      this.checkData(key);
    }
  }

  checkData(key: string) {
    console.log(this.customerForm);

    this.customerForm.get(key)?.valueChanges.subscribe((selectedValue) => {
      /* console.log(selectedValue);
      console.log(this.customerForm.get(key)?.valid); */

      if (this.customerForm.get(key)?.valid) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  getElem(name: string): Element {
    return this.renderer.selectRootElement(`.${name}`, true);
  }

  changeToEdit(elem: Element) {
    this.renderer.removeClass(elem, 'form-control-plaintext');
    this.renderer.addClass(elem, 'form-control');
  }

  changeFromEdit(elem: Element) {
    this.renderer.removeClass(elem, 'form-control');
    this.renderer.addClass(elem, 'form-control-plaintext');
  }

  stopEdit(id: number) {
    this.isDisabled = !this.isDisabled;
    this.showEdit = true;
    this.editCustomerId = -1;
    for (let i = 1; i < 5; i++) {
      const elem = this.getElem(`t${i}${id}`);
      this.changeFromEdit(elem);
    }
  }

  isEditingRow(id: number): boolean {
    return this.editCustomerId === id;
  }
}
