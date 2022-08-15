import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [CustomersComponent, AddCustomerComponent],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
  exports: [CustomersComponent],
})
export class CustomersModule {}
