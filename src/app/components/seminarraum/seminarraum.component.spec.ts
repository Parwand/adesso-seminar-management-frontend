import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarraumComponent } from './seminarraum.component';

describe('SeminarraumComponent', () => {
  let component: SeminarraumComponent;
  let fixture: ComponentFixture<SeminarraumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarraumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarraumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
