import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from 'src/app/shared/type';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  customers!: Array<Customer>;

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
  @Output() buttonClicked = new EventEmitter<boolean>();

  ngOnInit(): void {}

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
        this.buttonClicked.emit(true);
        this.customerForm.reset();
      },
      error: (err) => console.log(err),
    });
  }
}
