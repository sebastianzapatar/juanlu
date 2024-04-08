import { Routes } from '@angular/router';
import { PacientesComponent } from './feature/pacientes/pacientes.component';
import { ActividadesComponent } from './feature/actividades/actividades.component';
import { PacienteItemComponent } from './feature/pacientes/paciente-item/paciente-item.component';
import { PacienteActividadesComponent } from './feature/pacientes/paciente-actividades/paciente-actividades.component';
import { InformesComponent } from './feature/informes/informes.component';


export const routes: Routes = [
  { path: 'pacientes', component: PacientesComponent },
  { path: '', redirectTo: '/pacientes', pathMatch: 'full'},
  { path: 'actividades', component: ActividadesComponent },
  { path: 'informes', component: InformesComponent },
  
  {
    path: 'paciente/:id',
    component: PacienteItemComponent,
    title: 'Paciente'
  },
  {
    path: 'paciente/actividades/:id',
    component: PacienteActividadesComponent,
    title: 'Actividades de paciente'
  },
  
];
