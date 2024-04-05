import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from './paciente';
import { PacienteActividadService } from '../../../shared/paciente-actividad.service';
import { ActividadPaciente } from '../../../shared/paciente-actividad';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = '/api/pacientes';

  private apiUrlAsc = '/api/pacientes/asc';
  private apiUrlDesc = '/api/pacientes/desc';

  //Filtrado por id
  private apiUrlIdAsc = '/api/pacientes/id/asc';
  private apiUrlIdDesc = '/api/pacientes/id/desc';



  constructor(private httpClient: HttpClient) { }

  getAllPacientes(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.apiUrl);
  }

  getAllPacientesAsc(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.apiUrlAsc);
  }

  getAllPacientesDesc(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.apiUrlDesc);
  }

  getAllPacientesIdAsc(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.apiUrlIdAsc);
  }

  getAllPacientesIdDesc(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.apiUrlIdDesc);
  }


  getPacienteById(id: number): Observable<Paciente> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Paciente>(url);
  }

  deletePaciente(id: string): Observable<Paciente> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Paciente>(url);
  }
  
  save(data: any): Observable<Paciente> {
    return this.httpClient.post<Paciente>(this.apiUrl, data);
  }
}


