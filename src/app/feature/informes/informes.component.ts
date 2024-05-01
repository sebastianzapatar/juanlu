import { Component } from '@angular/core';
import { RegistroService } from '../registros/service/registro.service';
import { Registro } from '../registros/service/registro';
import { RegistroComponent } from '../registros/registro/registro.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-informes',
  standalone: true,
  imports:[RegistroComponent,CommonModule],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css'
})
export class InformesComponent {
  listadoRegistros: any[] = []; // Variable para almacenar los registros

  constructor(private registroService: RegistroService) {} // Inyecta el servicio de registros

  cargarRegistros() {
    // Llama al servicio para obtener todos los registros
    this.registroService.getAllRegistros().subscribe(
      (registros: any[]) => {
        this.listadoRegistros = registros; // Guarda los registros en la variable listadoRegistros
      },
      error => {
        console.error('Error al obtener los registros:', error);
      }
    );
  }
}