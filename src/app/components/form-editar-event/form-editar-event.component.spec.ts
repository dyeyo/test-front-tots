import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarEventComponent } from './form-editar-event.component';

describe('FormEditarEventComponent', () => {
  let component: FormEditarEventComponent;
  let fixture: ComponentFixture<FormEditarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditarEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEditarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
