import { TestBed } from '@angular/core/testing';

import { MedDatabaseService } from './med-database.service';

describe('MedDatabaseService', () => {
  let service: MedDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
