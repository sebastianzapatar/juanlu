import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesAgregarCategoriaComponent } from './actividades-agregar-categoria.component';

describe('ActividadesAgregarCategoriaComponent', () => {
  let component: ActividadesAgregarCategoriaComponent;
  let fixture: ComponentFixture<ActividadesAgregarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesAgregarCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActividadesAgregarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
