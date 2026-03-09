import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForAPharmacyComponent } from './search-for-a-pharmacy.component';

describe('SearchForAPharmacyComponent', () => {
  let component: SearchForAPharmacyComponent;
  let fixture: ComponentFixture<SearchForAPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForAPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForAPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
