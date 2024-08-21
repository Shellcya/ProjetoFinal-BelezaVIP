import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarAdminComponent } from './agendar-admin.component';

describe('AgendarAdminComponent', () => {
  let component: AgendarAdminComponent;
  let fixture: ComponentFixture<AgendarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendarAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
