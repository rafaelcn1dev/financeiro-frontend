import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCredorComponent } from './criar-credor.component';

describe('CriarCredorComponent', () => {
  let component: CriarCredorComponent;
  let fixture: ComponentFixture<CriarCredorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarCredorComponent]
    });
    fixture = TestBed.createComponent(CriarCredorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
