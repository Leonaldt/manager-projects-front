import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Risk } from '../../enum.risk';

@Component({
  selector: 'app-calculate-investment-dialog',
  templateUrl: './calculate-investment-dialog.component.html',
  styleUrls: ['./calculate-investment-dialog.component.scss']
})
export class CalculateInvestmentDialogComponent implements OnInit {

  returnOnInvestment: number;
  negativeValue: boolean = true;

  formInvestment: FormGroup = this.fb.group({
    'value': [0.00, [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<CalculateInvestmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() { }

  onDismiss(): void { this.dialogRef.close(false); }

  calculate() {
    switch (this.data.risk) {
      case Risk.BAIXO:
        this.returnOnInvestment = (this.formInvestment.value.value * 5) / 100;
        break;
      case Risk.MEDIO:
        this.returnOnInvestment = (this.formInvestment.value.value * 10) / 100;
        break;
      case Risk.ALTO:
        this.returnOnInvestment = (this.formInvestment.value.value * 20) / 100;
        break;
    }
  }

}
