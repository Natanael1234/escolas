import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { AlunoModalPage } from '../aluno-modal/aluno-modal';
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
  exports: [
    TurmaPage
  ]
})
export class TurmaPageModule { }
