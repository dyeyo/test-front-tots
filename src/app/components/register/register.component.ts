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
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);
  formRegister: FormGroup | any;
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.required],
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

  submitRegister() {
    const payload: IUsers = this.formRegister.value;
    this.authService.register(payload).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastr.error("Error al hacer el registro","Algo va mal");
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
