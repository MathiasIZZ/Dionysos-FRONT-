import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProComponent } from './user-pro.component';

describe('UserProComponent', () => {
  let component: UserProComponent;
  let fixture: ComponentFixture<UserProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
