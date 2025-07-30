import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCredorComponent } from './editar-credor.component';

describe('EditarCredorComponent', () => {
  let component: EditarCredorComponent;
  let fixture: ComponentFixture<EditarCredorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCredorComponent]
    });
    fixture = TestBed.createComponent(EditarCredorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
