import { NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EventsService } from './../../services/events.service';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

@Component({
  selector: 'app-form-editar-event',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './form-editar-event.component.html',
  styleUrl: './form-editar-event.component.css',
})
export class FormEditarEventComponent {
  formBuilder = inject(FormBuilder);
  eventService = inject(EventsService);
  toastr = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  formReserva: FormGroup | any;
  eventoId: string = '';
  espacioId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventoId = params['id'];
    });
    this.createForm();
    this.loadData();
  }

  createForm() {
    this.formReserva = this.formBuilder.group({
      nombre_evento: ['', Validators.required],
      fecha: ['', Validators.required],
      hora_inicio: ['', [Validators.required], [this.hourValidatorAsync]],
      hora_fin: ['', [Validators.required], [this.hourValidatorAsync]],
    });
  }

  loadData() {
    this.eventService.myEditReservas(this.eventoId).subscribe(
      (data: any) => {
        console.log(data);
        this.espacioId = data.espacio_id;
        this.formReserva.get('nombre_evento').setValue(data.nombre_evento);
        const date = new Date(data.fecha);
        const formattedDate = date.toISOString().split('T')[0];
        this.formReserva.get('fecha').setValue(formattedDate);
        this.formReserva.get('hora_inicio').setValue(data.hora_inicio);
        this.formReserva.get('hora_fin').setValue(data.hora_fin);
      },
      (error) => {
        this.toastr.error("Error al cargar los datos", 'Algo va mal');
      }
    );
  }

  submitUpdateReserva() {
    const payload = {
      espacio_id: this.espacioId,
      nombre_evento: this.formReserva.get('nombre_evento').value,
      fecha: this.formReserva.get('fecha').value,
      hora_inicio: this.formReserva.get('hora_inicio').value,
      hora_fin: this.formReserva.get('hora_fin').value,
    };
    this.eventService.updateReserva(payload, this.eventoId).subscribe(
      (data) => {
        this.toastr.success('Su reserva fue actualizada con exito', 'Genial!');
        this.router.navigate(['/mis-reservas']);
      },
      (error) => {
        this.toastr.error("Error al actualziar la reserva", 'Algo va mal');
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
