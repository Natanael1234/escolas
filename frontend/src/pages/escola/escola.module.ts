import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolaPage } from './escola';
import { EscolaRoutingModule } from './escola-routing.module';

@NgModule({
  declarations: [
    EscolaPage
  ],
  imports: [
    IonicPageModule.forChild(EscolaPage),
    EscolaRoutingModule
  ],
  exports: [
    EscolaPage
  ]
})
export class EscolaPageModule {}
