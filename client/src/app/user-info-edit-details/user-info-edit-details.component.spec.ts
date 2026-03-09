import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoEditDetailsComponent } from './user-info-edit-details.component';

describe('UserInfoEditDetailsComponent', () => {
  let component: UserInfoEditDetailsComponent;
  let fixture: ComponentFixture<UserInfoEditDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoEditDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
