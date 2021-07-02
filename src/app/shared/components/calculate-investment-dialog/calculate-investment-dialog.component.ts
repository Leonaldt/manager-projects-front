import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from 'src/app/project/project.service';
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

  project: any;

  constructor(
    public dialogRef: MatDialogRef<CalculateInvestmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private service: ProjectService
  ) {
    this.service.getById(data).subscribe(project => this.project = project);
  }

  ngOnInit() { }

  onDismiss(): void { this.dialogRef.close(false); }

  calculate() {
    if (this.formInvestment.value.value < this.project.value) {
      this.snackBar.open('O valor do investimento não pode ser menor que o valor do projeto.', 'OK', { duration: 2000 });
      return;
    }

    switch (this.project.risk) {
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
