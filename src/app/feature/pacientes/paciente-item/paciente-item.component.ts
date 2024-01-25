import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Paciente } from '../service/paciente';
import { PacienteService } from '../service/paciente.service';
import { GeriatriaService } from '../../../shared/geriatria.service';
import { Actividad } from '../../actividades/service/actividad';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../actividades/service/actividad.service';

@Component({
  selector: 'app-paciente-item',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './paciente-item.component.html',
  styleUrl: './paciente-item.component.css'
})
export class PacienteItemComponent {
  paciente:Paciente | undefined 
  actividadesPaciente: Actividad[] = [];

  pacienteId:string
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private pacienteService: PacienteService, private actividadService:ActividadService) {
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

imprimir(){
  console.log(this.actividadesPaciente)
}
}
