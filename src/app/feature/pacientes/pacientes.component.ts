import { Component, OnInit } from '@angular/core';
import { PacienteItemComponent } from "./paciente-item/paciente-item.component";
import { PacienteService } from './service/paciente.service';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './service/paciente';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-pacientes',
    standalone: true,
    templateUrl: './pacientes.component.html',
    styleUrl: './pacientes.component.css',
    imports: [CommonModule,PacienteItemComponent,RouterModule ],
    providers:[HttpClient]
})

export class PacientesComponent implements OnInit {
    pacientesLista: Paciente[] = []; 
    
    constructor(private pacienteService: PacienteService) {}
  
    ngOnInit(): void {
      this.pacienteService.getAllPacientes().subscribe(data => {
        this.pacientesLista = data;
      });
    }
  }
