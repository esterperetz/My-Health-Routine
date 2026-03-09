import { TestBed } from '@angular/core/testing';

import { MedicneUserService } from './medicne-user.service';

describe('MedicneUserService', () => {
  let service: MedicneUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicneUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
