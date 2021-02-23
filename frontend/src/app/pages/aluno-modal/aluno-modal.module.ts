import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlunoModalPage } from './aluno-modal';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IMaskModule } from 'angular-imask';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    // https://github.com/uNmAnNeR/imaskjs
    // https://github.com/uNmAnNeR/imaskjs/tree/master/packages/angular-imask
    IMaskModule
  ],
  declarations: [AlunoModalPage],
  entryComponents: [AlunoModalPage],
  exports: [AlunoModalPage]
})
export class AlunoModalPageModule { }
