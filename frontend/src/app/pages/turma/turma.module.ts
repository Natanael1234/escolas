import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TurmaPageRoutingModule } from './turma-routing.module';
import { TurmaPage } from './turma.page';
import { IMaskModule } from 'angular-imask';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurmaPageRoutingModule,

    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    // https://github.com/uNmAnNeR/imaskjs
    // https://github.com/uNmAnNeR/imaskjs/tree/master/packages/angular-imask
    IMaskModule
  ],
  declarations: [TurmaPage]
})
export class TurmaPageModule { }
