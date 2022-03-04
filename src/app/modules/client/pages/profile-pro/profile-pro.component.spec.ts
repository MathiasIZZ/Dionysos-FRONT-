import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProComponent } from './profile-pro.component';

describe('ProfileProComponent', () => {
  let component: ProfileProComponent;
  let fixture: ComponentFixture<ProfileProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
