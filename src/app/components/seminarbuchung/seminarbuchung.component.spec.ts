import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarbuchungComponent } from './seminarbuchung.component';

describe('SeminarbuchungComponent', () => {
  let component: SeminarbuchungComponent;
  let fixture: ComponentFixture<SeminarbuchungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarbuchungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarbuchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
