import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDiagramsComponent } from './statistics-diagrams.component';

describe('StatisticsDiagramsComponent', () => {
  let component: StatisticsDiagramsComponent;
  let fixture: ComponentFixture<StatisticsDiagramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsDiagramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDiagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
