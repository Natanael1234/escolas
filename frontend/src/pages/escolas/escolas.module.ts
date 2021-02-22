import { NgModule } from '@angular/core';
import { BrMaskerModule } from 'br-mask';
import { IonicPageModule } from 'ionic-angular';
import { EscolasPage } from './escolas';
import { EscolasRoutingModule } from './escolas-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EscolasPage
  ],
  imports: [
    IonicPageModule.forChild(EscolasPage),
    BrMaskerModule,
    EscolasRoutingModule,
    FormsModule
  ],
  exports: [
    EscolasPage
  ]
})
export class EscolasPageModule {}
