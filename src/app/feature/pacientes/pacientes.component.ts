import { Component, OnInit } from '@angular/core';
import { PacienteItemComponent } from "./paciente-item/paciente-item.component";
import { PacienteService } from './service/paciente.service';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './service/paciente';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PacienteAgregarComponent } from "./paciente-agregar/paciente-agregar.component";
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../../shared/alerta-service';

@Component({
    selector: 'app-pacientes',
    standalone: true,
    templateUrl: './pacientes.component.html',
    styleUrl: './pacientes.component.scss',
    providers: [HttpClient],
    imports: [CommonModule, PacienteItemComponent, RouterModule, PacienteAgregarComponent, FormsModule]
})

export class PacientesComponent implements OnInit {
  pacientesLista: Paciente[] = [];
  nombreAscendente: boolean = true; // Variable para controlar el orden del filtrado
  idAscendente: boolean = true; // Variable para controlar el orden del filtrado
  identificacion: string = '';

  constructor(private pacienteService: PacienteService, private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  toggleFiltrarNombre(): void {
    this.nombreAscendente = !this.nombreAscendente; // Alternar entre ascendente y descendente
    this.obtenerPacientesNombre();
  }

  toggleFiltrarId(): void {
    this.idAscendente = !this.idAscendente; // Alternar entre ascendente y descendente
    this.obtenerPacientesId();
  }

  buscarPorIdentificacion(): void {
    if (this.identificacion.trim() !== '') {
      this.pacienteService.getPacienteById(parseInt(this.identificacion)).subscribe(paciente => {
        this.pacientesLista = paciente ? [paciente] : [];
      });
    } else {
      this.obtenerPacientes();
    }
  }

  obtenerPacientes(): void {
    this.pacienteService.getAllPacientes().subscribe(data => {
      this.pacientesLista = data;
    });
  }

  obtenerPacientesNombre(): void {
    if (this.nombreAscendente) {
      this.pacienteService.getAllPacientesAsc().subscribe(data => {
        this.pacientesLista = data;
      });
    } else {
      this.pacienteService.getAllPacientesDesc().subscribe(data => {
        this.pacientesLista = data;
      });
    }
  }

  obtenerPacientesId(): void {
    if (this.idAscendente) {
      this.pacienteService.getAllPacientesIdAsc().subscribe(data => {
        this.pacientesLista = data;
      });
    } else {
      this.pacienteService.getAllPacientesIdDesc().subscribe(data => {
        this.pacientesLista = data;
      });
    }
  } 

  eliminarPaciente(id: string, nombre: string): void {
    this.alertaService.alertaConfirmacionPromesa(`¿Está seguro que desea eliminar al paciente ${nombre}? Se eliminarán todas sus actividades y registros en el programa VIDA`).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.deletePaciente(id).subscribe(() => {
          this.alertaService.alertaSuccess(`El paciente ${nombre} ha sido eliminado exitosamente.`);
          this.obtenerPacientes(); // Actualizar la lista después de eliminar
        }, error => {
          this.alertaService.alertaError(`Ha ocurrido un error al intentar eliminar al paciente ${nombre}.`);
        });
      }
    });
  }
}