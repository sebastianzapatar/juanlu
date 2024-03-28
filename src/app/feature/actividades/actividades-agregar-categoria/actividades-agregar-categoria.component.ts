import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoActividadService } from '../service/tipo-actividad/tipo-actividad.service';
import { AlertaService } from '../../../shared/alerta-service';
import { TipoActividad } from '../service/tipo-actividad/tipo-actividad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividades-agregar-categoria',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './actividades-agregar-categoria.component.html',
  styleUrl: './actividades-agregar-categoria.component.css'
})
export class ActividadesAgregarCategoriaComponent {


  nombreCategoria: string = '';
  tipos: TipoActividad[] = [];

  constructor(private tipoActividadService:TipoActividadService, private alerta:AlertaService){
  }

  ngOnInit(): void {
    this.tipoActividadService.getAllTipoActividad().subscribe(data => {
      this.tipos = data;
    });
  }

  agregarCategoria() {
    const categoriaData = { nombre: this.nombreCategoria };
    this.tipoActividadService.save(categoriaData).subscribe(
      (resultado) => {
        console.log(resultado); // Puedes hacer algo con la respuesta si es necesario
        this.alerta.alertaSuccess('Categoría agregada correctamente');
      },
      (error) => {
        console.error(error); // Manejo de errores si es necesario
        this.alerta.alertaError('Error al agregar categoría');
      }
    );
  }

  eliminarCategoria(id: number) {
    this.tipoActividadService.deleteTipoActividad(id).subscribe(
      () => {
        this.alerta.alertaSuccess('Categoría eliminada correctamente');
      },
      (error) => {
        console.error(error);
        this.alerta.alertaError('Error al eliminar categoría');
      }
    );
  }

}
