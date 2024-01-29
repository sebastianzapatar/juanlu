import { Component, OnInit } from '@angular/core';
import { Actividad } from './service/actividad';
import { ActividadService } from './service/actividad.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActividadesAgregarComponent } from "./actividades-agregar/actividades-agregar.component";

@Component({
    selector: 'app-actividades',
    standalone: true,
    templateUrl: './actividades.component.html',
    styleUrl: './actividades.component.css',
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, ActividadesAgregarComponent]
})
export class ActividadesComponent implements OnInit {


  actividades: Actividad[] = [];
  actividadForm: FormGroup;

  constructor(private actividadService:ActividadService,private httpClient: HttpClient){

    this.actividadForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      
    });

  }
  ngOnInit(): void {
    this.actividadService.getAllActividades().subscribe(data => {
      this.actividades = data;
    });
  }

  crearActividad() {
    if (this.actividadForm.valid) {

      const actividadData = {
        nombre: this.actividadForm.value.nombre,
        descripcion: this.actividadForm.value.descripcion,
        hora: this.actividadForm.value.hora || null,
        url: this.actividadForm.value.url
      };

      console.log("Objeto: ",actividadData)

      /*const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };*/
  
      this.actividadService.save(actividadData).subscribe(
        (actividad: Actividad) => {
          console.log('Actividad agregada exitosamente:', actividad);
          // Puedes realizar otras operaciones después de agregar la actividad
        },
        error => {
          console.error('Error al agregar la actividad:', error);
        }
      );


      /*this.actividadService.save(actividadData).subscribe(
        (actividad: Actividad) => {
          console.log('Actividad agregada exitosamente:', actividad);
        },
        error => {
          console.error('Error al agregar la actividad:', error);
        }
      );*/


      console.log('Actividad creada:', actividadData);
    } else {
      console.log('Formulario no válido');
    }
  }

}
