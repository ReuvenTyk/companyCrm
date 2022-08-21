import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './core/auth.service';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthService],
    children: [
      { path: 'customers-component', component: CustomersComponent },
      { path: 'add-customer', component: AddCustomerComponent },
    ],
  },
  { path: 'signup-component', component: SignupComponent },
  { path: 'login-component', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
