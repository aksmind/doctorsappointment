import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppointmentProvider } from '../providers/appointment/appointment';
import { HttpClientModule } from '@angular/common/http';
import { DisplayPage } from '../pages/display/display';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network'; 
import { BackgroundMode } from '@ionic-native/background-mode';

export const firebaseconfig = {
  apiKey: "AIzaSyBKTox01byAmWS4e43HVrCBwyL0VL7iz0o",
  authDomain: "todolistapp-60e49.firebaseapp.com",
  databaseURL: "https://todolistapp-60e49.firebaseio.com",
  projectId: "todolistapp-60e49",
  storageBucket: "todolistapp-60e49.appspot.com",
  messagingSenderId: "1007299436143"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DisplayPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DisplayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppointmentProvider,
    Storage,
    Network,
    BackgroundMode
  ]
})
export class AppModule {}
