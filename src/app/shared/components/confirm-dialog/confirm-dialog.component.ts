import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.title = 'Excluir Registro';
    this.message = 'Você tem certeza que deseja fazer isso?';
  }

  ngOnInit() { }

  onConfirm(): void { this.dialogRef.close(true); }

  onDismiss(): void { this.dialogRef.close(false); }
}

export class ConfirmDialogModel { constructor() { } }
