import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteActividadesComponent } from './paciente-actividades.component';

describe('PacienteActividadesComponent', () => {
  let component: PacienteActividadesComponent;
  let fixture: ComponentFixture<PacienteActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacienteActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
