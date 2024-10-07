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
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

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
  toastr = inject(ToastrService);
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
    const payload: IEventos = this.formFilters?.value;
    this.eventsService.getEvents(payload).subscribe({
      next: (data: any) => {
        this.events = data;
      },
      error: (error) => {
        this.toastr.error("Error al cargar los espacios","Algo va mal");
      },
    });
}
}
