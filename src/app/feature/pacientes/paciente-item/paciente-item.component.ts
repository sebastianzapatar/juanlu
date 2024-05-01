import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Paciente } from '../service/paciente';
import { PacienteService } from '../service/paciente.service';
import { Actividad } from '../../actividades/service/actividad';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../actividades/service/actividad.service';
import { RegistroService } from '../../registros/service/registro.service';
import { RegistroComponent } from "../../registros/registro/registro.component"; // Importa el servicio de registros

@Component({
    selector: 'app-paciente-item',
    standalone: true,
    templateUrl: './paciente-item.component.html',
    styleUrl: './paciente-item.component.css',
    imports: [CommonModule, RouterModule, RegistroComponent]
})
export class PacienteItemComponent {
  paciente: Paciente | undefined 
  actividadesPaciente: Actividad[] = [];
  fechaSelected: string = new Date().toISOString().split('T')[0];
  pacienteId: string
  route: ActivatedRoute = inject(ActivatedRoute);

  registros: any[] = []; // Quitamos los registros quemados

  constructor(private pacienteService: PacienteService, private actividadService: ActividadService, private registroService: RegistroService) {
    this.pacienteId = parseInt(this.route.snapshot.params['id'], 10).toString();
    
  }

  ngOnInit(): void {
    
    this.pacienteService.getPacienteById(parseInt(this.pacienteId, 10)).subscribe(
      (paciente: Paciente) => {
        this.paciente = paciente;
///////////////////////
        this.paciente.actividadespaciente.forEach(actividad => {
          const idActividad = actividad.idActividad;
          this.actividadService.getActividadById(idActividad).subscribe(
            (actividad: Actividad) => {
              this.actividadesPaciente.push(actividad);
            },
            error => {
              console.error('Error al obtener el paciente:', error);
            }
          );
          
        });
/////////////////////

      },
      error => {
        console.error('Error al obtener el paciente:', error);
      }
    );


  }

  filtrar() {
    const year = (document.querySelector('input[placeholder="Año"]') as HTMLInputElement).value;
    const month = (document.querySelector('input[placeholder="Mes"]') as HTMLInputElement).value;
    const day = (document.querySelector('input[placeholder="Día"]') as HTMLInputElement).value;

    const fecha = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    if (this.validarFecha(fecha)) {
      console.log(fecha);

      // Llamar al servicio de registros para obtener registros por paciente y fecha
      this.registroService.getAllRegistrosByPacienteAndFecha(this.pacienteId, fecha).subscribe(
        (registros: any[]) => {
          this.registros = registros;
          console.log(registros); 
        },
        error => {
          console.error('Error al obtener los registros:', error);
        }
      );
      this.fechaSelected=fecha;

    } else {
      console.error('Fecha no válida.');
    }
  }

  validarFecha(fecha: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(fecha);
  }

  imprimir() {
    console.log(this.actividadesPaciente)
  }
}
