import { Component } from '@angular/core';
import { RegistroService } from '../registros/service/registro.service';
import { Registro } from '../registros/service/registro';
import { RegistroComponent } from '../registros/registro/registro.component';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../pacientes/service/paciente.service';
import { ActividadService } from '../actividades/service/actividad.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-informes',
    standalone: true,
    templateUrl: './informes.component.html',
    styleUrl: './informes.component.css',
    imports: [RegistroComponent, CommonModule,FormsModule]
})

export class InformesComponent {
  listadoRegistros: Registro[] = [];
  pacientes: any[] = [];
  actividades: any[] = [];

  pacienteId: string = '';
  actividadId: number | null = null;

  constructor(
    private registroService: RegistroService,
    private pacienteService: PacienteService,
    private actividadService: ActividadService
  ) {}

  cargarRegistros() {
    if (!this.pacienteId && !this.actividadId) {
      // Si ambos campos están vacíos, cargar todos los registros
      this.registroService.getAllRegistros().subscribe(
        (registros: Registro[]) => {
          this.listadoRegistros = registros;
        },
        error => {
          console.error('Error al obtener los registros:', error);
        }
      );
    } else if (this.pacienteId && !this.actividadId) {
      // Solo paciente seleccionado
      this.registroService.getAllRegistrosByPaciente(this.pacienteId).subscribe(
        (registros: Registro[]) => {
          this.listadoRegistros = registros;
        },
        error => {
          console.error('Error al obtener los registros:', error);
        }
      );
    } else if (!this.pacienteId && this.actividadId) {
      // Solo actividad seleccionada
      this.registroService.getAllRegistrosByActividad(this.actividadId).subscribe(
        (registros: Registro[]) => {
          this.listadoRegistros = registros;
        },
        error => {
          console.error('Error al obtener los registros:', error);
        }
      );
    } else if (this.pacienteId && this.actividadId) {
      // Ambos paciente y actividad seleccionados
      this.registroService.getAllRegistrosByPacienteAndActividad(this.pacienteId, this.actividadId).subscribe(
        (registros: Registro[]) => {
          this.listadoRegistros = registros;
        },
        error => {
          console.error('Error al obtener los registros:', error);
        }
      );
    }
  }

  cargarPacientes() {
    this.pacienteService.getAllPacientes().subscribe(
      (pacientes: any[]) => {
        this.pacientes = pacientes;
      },
      error => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }

  cargarActividades() {
    this.actividadService.getAllActividades().subscribe(
      (actividades: any[]) => {
        this.actividades = actividades;
      },
      error => {
        console.error('Error al obtener las actividades:', error);
      }
    );
  }

  esRegistroRealizado(registro: Registro): boolean {
    return registro.estado === 'Realizado';
  }
}