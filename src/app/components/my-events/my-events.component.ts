import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { EventsService } from './../../services/events.service';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css',
})
export class MyEventsComponent {
  eventsService = inject(EventsService);
  events: any = [];

  ngOnInit(): void {
    this.loadMyEvents();
  }

  loadMyEvents() {
    this.eventsService.myReservas().subscribe(
      (data) => {
        this.events = data;
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

  cancelEvent(id: number) {
    Swal.fire({
      title: 'Esta seguro de cancelar este evento?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No, vovler`,
      customClass: {
        confirmButton:
          'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
        denyButton:
          'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventsService.deleteReserva(id).subscribe(
          (data) => {
            Swal.fire({
              title: "Eliminado",
              text: "Se elimino correctamente!",
              icon: "success",
              customClass: {
                confirmButton:
                  'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
                denyButton:
                  'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
              },
            });
            this.loadMyEvents();
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
      } else if (result.isDenied) {
        Swal.fire('No se realizo ningun cambio', '', 'info');
      }
    });
  }
}
