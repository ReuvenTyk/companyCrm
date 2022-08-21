import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { RegisterUser } from 'src/app/shared/type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerSuccess = false;
  registered = false;
  signupForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    retypePassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  validateDate(): boolean {
    if (!this.signupForm.valid) {
      return false;
    }

    const password = this.signupForm.get('password');
    const retypePassword = this.signupForm.get('retypePassword');

    if (
      !password ||
      !retypePassword ||
      password.value != retypePassword.value
    ) {
      return false;
    }

    return true;
  }

  constructor(private apiService: ApiService, private router: Router) {}
  onSubmit() {
    if (!this.validateDate()) {
      return;
    }
    const value: RegisterUser = this.signupForm.value;

    const details = {
      name: value.name,
      email: value.email,
      password: value.password,
    };

    this.apiService.register(details).subscribe({
      next: (data) => {
        this.registered = true;
        this.registerSuccess = true;
      },
      error: (err) => {
        this.registerSuccess = false;
        console.log(err);
      },
    });
  }

  notificationRespon(respon: boolean) {
    if (respon) {
      this.router.navigate(['login-component']);
    } else {
      this.registered = false;
    }
  }

  ngOnInit(): void {}
}
