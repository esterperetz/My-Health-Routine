import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalProductsComponent } from './natural-products.component';

describe('NaturalProductsComponent', () => {
  let component: NaturalProductsComponent;
  let fixture: ComponentFixture<NaturalProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturalProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
