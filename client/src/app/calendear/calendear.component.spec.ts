import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendearComponent } from './calendear.component';

describe('CalendearComponent', () => {
  let component: CalendearComponent;
  let fixture: ComponentFixture<CalendearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
