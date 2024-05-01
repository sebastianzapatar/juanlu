import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../actividades/service/actividad.service';
import { Actividad } from '../../actividades/service/actividad';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  @Input() registro: any; // Input para recibir los datos del registro desde el componente padre
  nombreActividad: string = ''; // Variable para almacenar el nombre de la actividad

  constructor(private actividadService: ActividadService) {} // Inyecta el servicio de actividades

  ngOnInit() {
    // Obtener la actividad correspondiente al ID del registro
    this.actividadService.getActividadById(this.registro.idActividad).subscribe(
      (actividad: Actividad) => {
        this.nombreActividad = actividad.nombre; // Almacena el nombre de la actividad
      },
      error => {
        console.error('Error al obtener la actividad:', error);
      }
    );
  }

  // Método para determinar la clase de color del texto según el estado del registro
  getColorClass() {
    return {
      'text-success': this.registro.estado === 'Realizado',
      'text-warning': this.registro.estado === 'No Realizado'
    };
  }
}

