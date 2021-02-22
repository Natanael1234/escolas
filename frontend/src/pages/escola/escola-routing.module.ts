// product-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscolaPage } from './escola';

const routes: Routes = [{ path: '', component: EscolaPage }];
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EscolaRoutingModule { }
