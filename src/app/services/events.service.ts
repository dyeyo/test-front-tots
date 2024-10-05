import { IEventos } from './../interfaces/IEventos';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(payload: any): Observable<any> {
    let queryParams = new HttpParams();

    for (const key in payload) {
      if (payload[key]) {
        queryParams = queryParams.append(key, payload[key]);
      }
    }
    return this.http.get(`${environment.url}espacios`, { params: queryParams });
  }

  getOneEvent(id: any) {
    return this.http.get(`${environment.url}espacios/${id}`);
  }

  sendReserva(payload: any) {
    return this.http.post(`${environment.url}reservas`, payload);
  }

  myReservas() {
    return this.http.get(`${environment.url}reservas`);
  }

  myEditReservas(id: string) {
    return this.http.get(`${environment.url}reservas/edit/${id}`);
  }

  updateReserva(payload: IEventos, id: number) {
    return this.http.put(`${environment.url}reservas/${id}`, payload);
  }

  deleteReserva(id: number) {
    return this.http.delete(`${environment.url}reservas/${id}`);
  }
}
