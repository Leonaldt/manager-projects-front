import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { TableModule } from '../shared/components/table/table.module';


@NgModule({
  declarations: [
    ProjectFormComponent,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxCurrencyModule,
    TableModule
  ], exports: [
    ProjectFormComponent,
    ProjectListComponent
  ]
})
export class ProjectModule { }
