import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { AlunoModalPage } from './aluno-modal';

@NgModule({
  declarations: [
    AlunoModalPage
  ],
  imports: [
    //IonicPageModule.forChild(AlunoModalPage)
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AlunoModalPage
  ],
  entryComponents : [
    AlunoModalPage
  ]
})
export class AlunoModalPageModule { }
