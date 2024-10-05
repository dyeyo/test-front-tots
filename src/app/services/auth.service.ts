import { IUsers } from './../interfaces/IUsers';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getUser());
  constructor(private http: HttpClient) {}

  register(payload: IUsers) {
    return this.http.post(`${environment.url}register`, payload).pipe(
      tap((data: any) => {
        const user = {
          email: payload.email,
        };
        this.setToken(user);
      })
    );
  }

  login(payload: IUsers) {
    return this.http.post(`${environment.url}login`, payload).pipe(
      tap((data: any) => {
        // const user = {
        //   email: payload.email,
        // };
        this.setToken(data.token);
      })
    );
  }

  getUser() {
    return localStorage.getItem('token');
  }

  getUserObservable() {
    return this.tokenSubject.asObservable();
  }

  setToken(token: any) {
    localStorage.setItem('token',  JSON.stringify(token)); 
    this.tokenSubject.next(token);
  }
}
