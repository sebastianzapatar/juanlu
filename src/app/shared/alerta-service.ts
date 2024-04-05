import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  

  alertaSuccess(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Listo',
      text: mensaje,
    }).then(function(){
      window.location.reload()
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
      title: 'Confirmación',
      text: mensaje,
      showCancelButton: true,  // Habilita el botón de Cancelar
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en OK
        window.location.reload();
      } else {
        // Si el usuario hace clic en Cancelar
        // No necesitas hacer nada aquí, ya que no se especifica ninguna acción
      }
    });
  }

  alertaConfirmacionPromesa(mensaje: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title: 'Confirmación',
      text: mensaje,
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
    });
  }
}