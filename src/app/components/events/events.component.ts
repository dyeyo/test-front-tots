import { IEventos } from './../../interfaces/IEventos';
import { environment } from './../../../environments/environment';
import {  RouterModule } from '@angular/router';
import { EventsService } from './../../services/events.service';
import { CommonModule, NgFor } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  eventsService = inject(EventsService);
  formFilters: FormGroup | any;
  events: any = [];
  urlMedia: String = environment.url_media

  ngOnInit(): void {
    this.loadEvents();
    this.createForm();
  }

  createForm() {
    this.formFilters = this.formBuilder.group({
      tipo: [''],
      capacidad: [''],
      fecha_inicio: [''],
      fecha_final: [''],
    });
  }

  loadEvents() {
    const payload:IEventos = this.formFilters?.value;
    this.eventsService.getEvents(payload).subscribe({
      next: (data: any) => {
        this.events = data;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error a hacer el pago',
          text: 'Algo va mal, intentelo mas tarde',
          icon: 'error',
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
            cancelButton:
              'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
          },
        });
        console.error('Error al registar:', error);
      },
    });
  }
}
