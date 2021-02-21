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
    // component: EscolasPage
    loadChildren: () => import('../pages/escolas/escolas.module')
                    .then((m) => m.EscolasPageModule),
  },
  {
    path: 'escola/:escolaId',
    loadChildren: () => import('../pages/escola/escola.module')
                    .then((m) => m.EscolaPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
