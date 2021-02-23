import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlunoModalPage } from './pages/aluno-modal/aluno-modal';
import { ReactiveFormsModule } from '@angular/forms';
// import { AlunoModalPageModule } from './pages/aluno-modal/aluno-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    AlunoModalPage
  ],
  entryComponents: [
    AlunoModalPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
