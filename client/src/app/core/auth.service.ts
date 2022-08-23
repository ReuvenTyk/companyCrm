import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Login, User } from '../shared/type';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenField = 'token';
  redirectUrl: string | null = null;
  constructor(private apiService: ApiService, private router: Router) {}
  userEmail?: string | null;
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (this.isLoggedIn()) {
      return true;
    }
    this.redirectUrl = state.url;

    return this.router.navigate(['login-component']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenField);
    if (token && token.length > 0) {
      this.apiService.setToken(token);
      return true;
    }
    return false;
  }

  login(details: Login): Observable<User> {
    this.userEmail = details.email;

    return this.apiService.login(details).pipe(
      tap((data: User) => {
        if (data.token) {
          localStorage.setItem(this.tokenField, data.token);
          localStorage.setItem('email', data.email);
          this.apiService.setToken(data.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenField);
    localStorage.removeItem('email');
    this.apiService.setToken('');
  }
}
