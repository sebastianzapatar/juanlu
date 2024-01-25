import { ActividadPaciente } from "../../../shared/paciente-actividad";

export interface Paciente{
    idPaciente:string;
    nombre:string;
    edad:number;
    actividadespaciente:ActividadPaciente[];

}