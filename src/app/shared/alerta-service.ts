import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  

  alertaSuccess(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: mensaje,
    });
  }

  alertaError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  }

  alertaConfirmacion(mensaje: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'confirmación',
      text: mensaje,
    });
  }
}