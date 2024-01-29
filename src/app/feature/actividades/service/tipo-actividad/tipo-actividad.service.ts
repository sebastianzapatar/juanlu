import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoActividad } from './tipo-actividad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {

  private apiUrl = '/api/tipoactividad';


  constructor(private httpClient: HttpClient) { }

  getAllTipoActividad(): Observable<TipoActividad[]> {
    return this.httpClient.get<TipoActividad[]>(this.apiUrl);
  }


  getTipoActividadById(id: number): Observable<TipoActividad> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<TipoActividad>(url);
  }

  deleteTipoActividad(id: number): Observable<TipoActividad> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<TipoActividad>(url);
  }

  save(data: any): Observable<TipoActividad> {
    return this.httpClient.post<TipoActividad>(this.apiUrl, data);
  }
}
