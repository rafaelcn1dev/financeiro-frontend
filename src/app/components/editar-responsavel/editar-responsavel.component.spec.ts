import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarResponsavelComponent } from './editar-responsavel.component';

describe('EditarResponsavelComponent', () => {
  let component: EditarResponsavelComponent;
  let fixture: ComponentFixture<EditarResponsavelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarResponsavelComponent]
    });
    fixture = TestBed.createComponent(EditarResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
