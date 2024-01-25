import { TestBed } from '@angular/core/testing';

import { PacienteActividadService } from './paciente-actividad.service';

describe('PacienteActividadService', () => {
  let service: PacienteActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
