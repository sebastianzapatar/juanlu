import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteItemComponent } from './paciente-item.component';

describe('PacienteItemComponent', () => {
  let component: PacienteItemComponent;
  let fixture: ComponentFixture<PacienteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacienteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
