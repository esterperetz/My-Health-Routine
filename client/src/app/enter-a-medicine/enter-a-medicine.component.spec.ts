import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAMedicineComponent } from './enter-a-medicine.component';

describe('EnterAMedicineComponent', () => {
  let component: EnterAMedicineComponent;
  let fixture: ComponentFixture<EnterAMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterAMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterAMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
