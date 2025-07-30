import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredoresComponent } from './credores.component';

describe('CredoresComponent', () => {
  let component: CredoresComponent;
  let fixture: ComponentFixture<CredoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredoresComponent]
    });
    fixture = TestBed.createComponent(CredoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
