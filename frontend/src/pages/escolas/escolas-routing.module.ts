// product-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscolasPage } from './escolas';

const routes: Routes = [{ path: '', component: EscolasPage }];
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EscolasRoutingModule { }
