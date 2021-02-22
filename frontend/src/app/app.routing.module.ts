import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'escolas',
    pathMatch: 'full'
  },
  {
    path: 'escolas',
    loadChildren: () => import('../pages/escolas/escolas.module')
      .then((m) => m.EscolasPageModule),
  },
  {
    path: 'escola/:escolaId',
    loadChildren: () => import('../pages/escola/escola.module')
      .then((m) => m.EscolaPageModule),
  },
  {
    path: 'turma/:turmaId',
    loadChildren: () => import('../pages/turma/turma.module')
      .then((m) => m.TurmaPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
