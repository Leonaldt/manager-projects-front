import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CalculateInvestmentDialogComponent } from 'src/app/shared/components/calculate-investment-dialog/calculate-investment-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  columns: Array<any> = [
    { name: 'name', label: 'Nome', width: '70%' },
    { name: 'risk', label: 'Risco', width: '10%' },
    { name: 'value', label: 'Valor', width: '10%' },
    { name: 'actions', label: 'Ações' },
  ];

  projects: any[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((projects: any) => {
      this.projects = projects.map(project => {
        return {
          _id: project._id,
          name: project.name,
          start_date: project.start_date,
          end_date: project.end_date,
          risk: project.risk == 0 ? 'Baixo' : project.risk == 1 ? 'Médio' : 'Alto',
          value: project.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
          participants: project.participants
        }
      });
    });
  }

  update(project: any) {
    this.router.navigate(['projects', 'edit', project._id]);
  }

  delete(id: any) {
    this.service.delete(id)
      .subscribe(() => {
        this.snackBar.open('Project has been removed.', 'OK', { duration: 2000 });
        this.load();
      }, () => {
        this.snackBar.open('Error when trying to remove the project.', 'OK', { duration: 2000 });
      });
  }

  openConfirmDialog(project: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px"
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.delete(project);
    });
  }

  openCalculateInvestmentDialog(project: any) {
    const dialogRef = this.dialog.open(CalculateInvestmentDialogComponent, {
      width: "40%",
      data: project
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.delete(project);
    });
  }

}
