import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesDatabaseComponent } from './medicines-database.component';

describe('MedicinesDatabaseComponent', () => {
  let component: MedicinesDatabaseComponent;
  let fixture: ComponentFixture<MedicinesDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinesDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinesDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
