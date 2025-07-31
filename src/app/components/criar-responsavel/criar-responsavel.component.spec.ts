import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarResponsavelComponent } from './criar-responsavel.component';

describe('CriarResponsavelComponent', () => {
  let component: CriarResponsavelComponent;
  let fixture: ComponentFixture<CriarResponsavelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarResponsavelComponent]
    });
    fixture = TestBed.createComponent(CriarResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
