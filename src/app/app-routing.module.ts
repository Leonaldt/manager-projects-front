import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectModule } from './project/project.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/projects' },
  // Lazyload aqui papai 🤙😎 para carregar somente o necessário durante a utilização da S(igle)P(age)A(pplication).
  { path: 'projects', loadChildren: () => ProjectModule },
  // { path: '**', component: ProjectListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
