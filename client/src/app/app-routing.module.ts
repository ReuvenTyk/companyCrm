import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: 'customers-component', component: CustomersComponent },
  { path: 'add-customer', component: AddCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
