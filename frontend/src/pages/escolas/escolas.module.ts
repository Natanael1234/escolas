import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolasPage } from './escolas';
import { EscolasRoutingModule } from './escolas-routing.module';

@NgModule({
  declarations: [
    EscolasPage
  ],
  imports: [
    IonicPageModule.forChild(EscolasPage),
    EscolasRoutingModule
  ],
  exports: [
    EscolasPage
  ]
})
export class EscolasPageModule {}
