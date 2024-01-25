import { TestBed } from '@angular/core/testing';

import { GeriatriaService } from './shared/geriatria.service';

describe('GeriatriaService', () => {
  let service: GeriatriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeriatriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
