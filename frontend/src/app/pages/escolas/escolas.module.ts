
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EscolasPage } from './escolas.page';
import { EscolasRoutingModule } from './escolas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscolasRoutingModule
  ],
  declarations: [EscolasPage]
})
export class EscolasPageModule {}
