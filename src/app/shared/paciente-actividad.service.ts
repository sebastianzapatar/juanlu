import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActividadPaciente } from './paciente-actividad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteActividadService {

  
  private apiUrl = 'http://34.148.160.13:8082/api/pacienteactividad';


  constructor(private httpClient: HttpClient) { }

  delete(idPaciente:string,idActividad:number): Observable<ActividadPaciente> {
    const url = `${this.apiUrl}/${idPaciente}/${idActividad}`;
    return this.httpClient.delete<ActividadPaciente>(url);
  }

  save(data: any): Observable<ActividadPaciente> {
    return this.httpClient.post<ActividadPaciente>(this.apiUrl, data);
  }
}
