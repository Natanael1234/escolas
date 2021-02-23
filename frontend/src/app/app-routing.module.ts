import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'escolas',
    pathMatch: 'full'
  },
  {
    path: 'escolas',
    loadChildren: () => import('./pages/escolas/escolas.module').then(m => m.EscolasPageModule)
  },
  {
    path: 'escola/new',
    loadChildren: () => import('./pages/escola/escola.module').then(m => m.EscolaPageModule)
  },
  {
    path: 'escola/:escolaId',
    loadChildren: () => import('./pages/escola/escola.module').then(m => m.EscolaPageModule)
  },
  {
    path: 'turma/:turmaId',
    loadChildren: () => import('./pages/turma/turma.module').then(m => m.TurmaPageModule)
  },
  {
    path: 'turma/new/:escolaId',
    loadChildren: () => import('./pages/turma/turma.module').then(m => m.TurmaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
