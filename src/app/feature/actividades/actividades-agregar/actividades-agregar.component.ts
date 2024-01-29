import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActividadService } from '../service/actividad.service';
import { HttpClient } from '@angular/common/http';
import { Actividad } from '../service/actividad';
import { CommonModule } from '@angular/common';
import { TipoActividadService } from '../service/tipo-actividad/tipo-actividad.service';
import { TipoActividad } from '../service/tipo-actividad/tipo-actividad';
import { AlertaService } from '../../../shared/alerta-service';

@Component({
  selector: 'app-actividades-agregar',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './actividades-agregar.component.html',
  styleUrl: './actividades-agregar.component.css'
})
export class ActividadesAgregarComponent {

  actividadForm: FormGroup;
  tipos: TipoActividad[] = [];

  constructor(
    private alerta:AlertaService,
    private tipoActividadService:TipoActividadService,
    private actividadService:ActividadService){
    this.actividadForm = new FormGroup({

      tipoActividad: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      
    });
  }

  ngOnInit(): void {
    this.tipoActividadService.getAllTipoActividad().subscribe(data => {
      this.tipos = data;
    });
  }
  
  crearActividad() {
    if (this.actividadForm.valid) {

      const actividadData = {
        nombre: this.actividadForm.value.nombre,
        descripcion: this.actividadForm.value.descripcion,
        tipoActividad:this.actividadForm.value.tipoActividad,
        hora: this.actividadForm.value.hora || null,
        url: this.actividadForm.value.url
      };

      console.log("Objeto: ",actividadData)

  
      //ESTE
      
      this.actividadService.save(actividadData).subscribe(
        (actividad: Actividad) => {
          console.log('Actividad agregada exitosamente:', actividad);
        },
        error => {
          console.error('Error al agregar la actividad:', error);
        }
      );
      
      this.alerta.alertaSuccess("Actividad creada satisfactoriamente")
      console.log('Actividad creada:', actividadData);
    } else {
      console.log('Formulario no válido');
    }
  }

}
