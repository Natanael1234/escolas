import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscolaPageRoutingModule } from './escola-routing.module';

import { EscolaPage } from './escola.page';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IMaskModule } from 'angular-imask';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EscolaPageRoutingModule,

    FormsModule,
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
  declarations: [EscolaPage]
})
export class EscolaPageModule {}
