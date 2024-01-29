import { Component } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Paciente } from '../service/paciente';
import { AlertaService } from '../../../shared/alerta-service';

@Component({
  selector: 'app-paciente-agregar',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './paciente-agregar.component.html',
  styleUrl: './paciente-agregar.component.css'
})
export class PacienteAgregarComponent {
  pacienteForm: FormGroup;


  constructor(private pacienteService:PacienteService,private alerta:AlertaService){
    this.pacienteForm = new FormGroup({
      identificacion: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
    });
  }

  agregarPaciente(){
    if (this.pacienteForm.valid) {

      const pacienteData = {
        identificacion: this.pacienteForm.value.identificacion,
        nombre: this.pacienteForm.value.nombre,
        edad: this.pacienteForm.value.edad || null,
      };

      console.log("Objeto: ",pacienteData)
      this.pacienteService.save(pacienteData).subscribe(
        (actividad: Paciente) => {
          this.alerta.alertaSuccess("Paciente agregado satisfactoriamente")
          // Puedes realizar otras operaciones después de agregar la actividad
        },
        error => {
          this.alerta.alertaError(error)
        }
      );


      console.log('Actividad creada:', pacienteData);
    } else {
      this.alerta.alertaError("El formulario es invalido")
    }

  }
  

}
