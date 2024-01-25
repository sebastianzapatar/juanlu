import { ActividadPaciente } from "../../../shared/paciente-actividad";

export interface Actividad{
    idActividad:number;
    nombre:string;
    descripcion:string;
    hora:string;
    url:string;
    actividadesPaciente:ActividadPaciente[];
}