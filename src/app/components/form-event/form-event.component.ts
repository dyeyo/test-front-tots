import { NgIf } from '@angular/common';
import { EventsService } from './../../services/events.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-event',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css',
})
export class FormEventComponent {
  formBuilder = inject(FormBuilder);
  eventService = inject(EventsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  formReserva: FormGroup | any;
  espacioId: string | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.espacioId = params['id'];
    });
    this.createForm();
  }

  createForm() {
    this.formReserva = this.formBuilder.group({
      nombre_evento: ['', Validators.required],
      fecha: ['', Validators.required],
      hora_inicio: ['', [Validators.required], [this.hourValidatorAsync]],
      hora_fin: ['', [Validators.required], [this.hourValidatorAsync]],
    });
  }

  submitReserva() {
    const payload = {
      espacio_id: this.espacioId,
      nombre_evento: this.formReserva.get('nombre_evento').value,
      fecha: this.formReserva.get('fecha').value,
      hora_inicio: this.formReserva.get('hora_inicio').value,
      hora_fin: this.formReserva.get('hora_fin').value,
    };
    this.eventService.sendReserva(payload).subscribe(
      (data) => {
        Swal.fire({
          title: 'Perfecto',
          text: 'Su reserva fue realizada con exito',
          icon: 'success',
          confirmButtonText: 'Continuar',
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
      },
      (error) => {
        Swal.fire({
          title: 'Lo sentimios',
          text: error.error.error,
          icon: 'error',
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
          },
        });
      }
    );
  }

  hourValidatorAsync(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const value = control.value;
    if (!value) return of(null);

    const [hours, minutes] = value.split(':');
    if (minutes === '00') {
      return of(null);
    }
    return of({ hourError: 'La hora debe ser exacta (Ej: 10:00, 11:00)' });
  }
}
