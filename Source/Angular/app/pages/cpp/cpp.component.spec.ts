import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CppPageComponent } from './cpp.component';

describe('CppPageComponent', () => {
  let component: CppPageComponent;
  let fixture: ComponentFixture<CppPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CppPageComponent]
    });
    fixture = TestBed.createComponent(CppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
