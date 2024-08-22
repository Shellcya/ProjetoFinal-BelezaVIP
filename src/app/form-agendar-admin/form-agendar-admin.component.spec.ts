import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgendarAdminComponent } from './form-agendar-admin.component';

describe('FormAgendarAdminComponent', () => {
  let component: FormAgendarAdminComponent;
  let fixture: ComponentFixture<FormAgendarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAgendarAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAgendarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
