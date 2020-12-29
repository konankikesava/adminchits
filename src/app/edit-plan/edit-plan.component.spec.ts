import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditPlanComponent } from './edit-plan.component';

describe('EditPlanComponent', () => {
  let component: EditPlanComponent;
  let fixture: ComponentFixture<EditPlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
