import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlunoPage } from './aluno';
import { AlunoRoutingModule } from './aluno-routing.module';

@NgModule({
  declarations: [
    AlunoPage
  ],
  imports: [
    IonicPageModule.forChild(AlunoPage),
    AlunoRoutingModule
  ],
  exports: [
    AlunoPage
  ]
})
export class AlunoPageModule { }
