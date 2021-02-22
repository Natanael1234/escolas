import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TurmaPage } from './turma';
import { TurmaRoutingModule } from './turma-routing.module';

@NgModule({
  declarations: [
    TurmaPage,
  ],
  imports: [
    IonicPageModule.forChild(TurmaPage),
    TurmaRoutingModule
  ],
})
export class TurmaPageModule {}
