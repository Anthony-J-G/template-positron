import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendConnTestPageComponent } from './backend-conn-test.component';

describe('BackendConnTestComponent', () => {
  let component: BackendConnTestPageComponent;
  let fixture: ComponentFixture<BackendConnTestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackendConnTestPageComponent]
    });
    fixture = TestBed.createComponent(BackendConnTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
