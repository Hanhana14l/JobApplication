import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAddingFormComponent } from './job-adding-form.component';

describe('JobAddingFormComponent', () => {
  let component: JobAddingFormComponent;
  let fixture: ComponentFixture<JobAddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobAddingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
