import { IUsers } from './../../interfaces/IUsers';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  formLogin: FormGroup | any;
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(149),
          Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  submitLogin() {
    const payload: IUsers = this.formLogin.value;
    this.authService.login(payload).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al registar:', error);
        Swal.fire({
          title: 'Error a hacer el pago',
          text: 'Algo va mal, intentelo mas tarde',
          icon: 'error',
        });
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
