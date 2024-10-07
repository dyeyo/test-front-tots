import { NgIf } from '@angular/common';
import { IUsers } from './../../interfaces/IUsers';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);
  formLogin: FormGroup | any;
  
  ngOnInit(): void {
    this.createForm();
  }
 
  createForm() {
    this.formLogin = this.formBuilder.group({
      email: [
        'diego@gmail.com',
        [
          Validators.required,
          Validators.maxLength(149),
          Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
        ],
      ],
      password: ['123456789', Validators.required],
    });
  }

  submitLogin() {
    const payload: IUsers = this.formLogin.value;
    this.authService.login(payload).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastr.error("Error al inicar sesion","Algo va mal");
      },
    });
  }
}
