import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousLotComponent } from './sous-lot.component';

describe('SousLotComponent', () => {
  let component: SousLotComponent;
  let fixture: ComponentFixture<SousLotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousLotComponent]
    });
    fixture = TestBed.createComponent(SousLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
