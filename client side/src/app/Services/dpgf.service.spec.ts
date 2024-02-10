import { TestBed } from '@angular/core/testing';

import { DpgfService } from './dpgf.service';

describe('DpgfService', () => {
  let service: DpgfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpgfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
