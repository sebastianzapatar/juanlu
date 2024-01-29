import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../service/paciente.service';
import { ActividadService } from '../../actividades/service/actividad.service';
import { Paciente } from '../service/paciente';
import { Actividad } from '../../actividades/service/actividad';
import { PacienteActividadService } from '../../../shared/paciente-actividad.service';
import { ActividadPaciente } from '../../../shared/paciente-actividad';
import { AlertaService } from '../../../shared/alerta-service';

@Component({
  selector: 'app-paciente-actividades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-actividades.component.html',
  styleUrl: './paciente-actividades.component.css'
})
export class PacienteActividadesComponent {
  paciente:Paciente | undefined 
  actividadesPaciente: Actividad[] = [];
  actividades: Actividad[] = [];

  pacienteId:string
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private pacienteService: PacienteService, private actividadService:ActividadService,private pacienteActividadService:PacienteActividadService,
    private alertaService:AlertaService) {
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

    this.actividadService.getAllActividades().subscribe(data => {
      this.actividades = data;
    });

  }

  eliminarActividad(idActividad: number) {
    if (this.paciente && this.pacienteId) {
      const idPaciente = this.pacienteId.toString();

      this.pacienteActividadService.delete(idPaciente, idActividad).subscribe(
        (actividadPaciente: ActividadPaciente) => {
          console.log('Actividad eliminada exitosamente:', actividadPaciente);
          // Puedes realizar otras operaciones después de eliminar la actividad
        },
        error => {
          console.error('Error al eliminar la actividad:', error);
        }
      );
    } else {
      console.error('Error: No se pudo obtener el ID del paciente.');
    }
    this.alertaService.alertaSuccess("Listo pa")
    
    
    
  }

      agregarActividad(idActividad: number, idPaciente: string) {
        
        const pacienteActividadData = {
          idPaciente: idPaciente,
          idActividad: idActividad
        };

        console.log(pacienteActividadData);

        this.pacienteActividadService.save(pacienteActividadData).subscribe(
          (actividadPaciente: ActividadPaciente) => {
            console.log('Actividad agregada exitosamente:', actividadPaciente);
            // Puedes realizar otras operaciones después de agregar la actividad
          },
          error => {
            console.error('Error al agregar la actividad:', error);
          }
        );
        this.alertaService.alertaSuccess("Listo pa")
        
      }
}
