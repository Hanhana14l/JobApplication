import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplingFormComponent } from './appling-form.component';

describe('ApplingFormComponent', () => {
  let component: ApplingFormComponent;
  let fixture: ComponentFixture<ApplingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
