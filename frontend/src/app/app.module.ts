import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { EscolasProvider } from '../providers/escolas/escolas.provider';
import { AlunoModalPageModule } from '../pages/aluno-modal/aluno-modal.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlunoModalPageModule,
    IonicModule.forRoot(MyApp, {
      // locationStrategy: 'path'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EscolasProvider
  ]
})
export class AppModule { }
