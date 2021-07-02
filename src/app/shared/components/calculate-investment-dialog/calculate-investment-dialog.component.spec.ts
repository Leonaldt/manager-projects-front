import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateInvestmentDialogComponent } from './calculate-investment-dialog.component';

describe('CalculateInvestmentDialogComponent', () => {
  let component: CalculateInvestmentDialogComponent;
  let fixture: ComponentFixture<CalculateInvestmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateInvestmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateInvestmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
