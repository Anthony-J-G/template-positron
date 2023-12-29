import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPageComponent } from './test.component';

describe('TestPageComponent', () => {
  let component: TestPageComponent;
  let fixture: ComponentFixture<TestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPageComponent]
    });
    fixture = TestBed.createComponent(TestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
