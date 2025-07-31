import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivationLogoutComponent } from './deactivation-logout.component';

describe('DeactivationLogoutComponent', () => {
  let component: DeactivationLogoutComponent;
  let fixture: ComponentFixture<DeactivationLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeactivationLogoutComponent]
    });
    fixture = TestBed.createComponent(DeactivationLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
