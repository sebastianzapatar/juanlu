import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from './actividad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiUrl = '/api/actividades';


  constructor(private httpClient: HttpClient) { }

  getAllActividades(): Observable<Actividad[]> {
    return this.httpClient.get<Actividad[]>(this.apiUrl);
  }


  getActividadById(id: number): Observable<Actividad> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Actividad>(url);
  }

  deleteActividad(id: number): Observable<Actividad> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Actividad>(url);
  }

  save(data: any): Observable<Actividad> {
    return this.httpClient.post<Actividad>(this.apiUrl, data);
  }
}
