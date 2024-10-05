import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const admin = localStorage.getItem('pass');

    if (admin == '1') {
      return true; 
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}