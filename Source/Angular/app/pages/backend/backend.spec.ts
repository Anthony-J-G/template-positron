import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendPageComponent } from './backend.component';

describe('BackendConnTestComponent', () => {
  let component: BackendPageComponent;
  let fixture: ComponentFixture<BackendPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackendPageComponent]
    });
    fixture = TestBed.createComponent(BackendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
