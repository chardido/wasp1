import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SelezionaprogettoPage } from "../pages/selezionaprogetto/selezionaprogetto";
import { HomeProgettoPage } from '../pages/home-progetto/home-progetto';
import { CreaProgettoPage } from '../pages/crea-progetto/crea-progetto';
import { AggiungimemberPage } from '../pages/aggiungimember/aggiungimember';
import { CreaTaskPage } from '../pages/crea-task/crea-task';
import { AssegnaTaskPage } from '../pages/assegna-task/assegna-task';
import { AssegnaTaskPersonaPage } from '../pages/assegna-task-persona/assegna-task-persona';
import { ModificaBudgetPage } from '../pages/modifica-budget/modifica-budget';
import { ModificaRisorsaPage } from '../pages/modifica-risorsa/modifica-risorsa';
import { VisualizzaMembersPage } from '../pages/visualizza-members/visualizza-members';
import { ProfiloMemberPage } from '../pages/profilo-member/profilo-member';
import { ModificaRicavoRisorsaPage } from '../pages/modifica-ricavo-risorsa/modifica-ricavo-risorsa';
import { InvioOreSelTaskPage } from '../pages/invio-ore-sel-task/invio-ore-sel-task';
import { InvioOrePage } from '../pages/invio-ore/invio-ore';
import { HomeTmPage } from '../pages/home-tm/home-tm';
import { DettaglioTaskPage } from "../pages/dettaglio-task/dettaglio-task";
import { ConvalidaOreListaPage } from "../pages/convalida-ore-lista/convalida-ore-lista";
import { VisualizzaTaskPage } from "../pages/visualizza-task/visualizza-task";
import { VisualizzaAssociatiTaskPage } from "../pages/visualizza-associati-task/visualizza-associati-task";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
      MyApp,
      HomePage,
      ListPage,
      WelcomePage,
      LoginPage,
      SignupPage,
      SelezionaprogettoPage,
      HomeProgettoPage,
      CreaProgettoPage,
      AggiungimemberPage,
      CreaTaskPage,
      AssegnaTaskPage,
      AssegnaTaskPersonaPage,
      ModificaBudgetPage,
      ModificaRisorsaPage,
      VisualizzaMembersPage,
      ProfiloMemberPage,
      ModificaRicavoRisorsaPage,
      InvioOreSelTaskPage,
      InvioOrePage,
      HomeTmPage,
      DettaglioTaskPage,
      ConvalidaOreListaPage,
      VisualizzaTaskPage,
      VisualizzaAssociatiTaskPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      ListPage,
      WelcomePage,
      LoginPage,
      SignupPage,
      SelezionaprogettoPage,
      HomeProgettoPage,
      CreaProgettoPage,
      AggiungimemberPage,
      CreaTaskPage,
      AssegnaTaskPage,
      AssegnaTaskPersonaPage,
      ModificaBudgetPage,
      ModificaRisorsaPage,
      VisualizzaMembersPage,
      ProfiloMemberPage,
      ModificaRicavoRisorsaPage,
      InvioOreSelTaskPage,
      InvioOrePage,
      HomeTmPage,
      DettaglioTaskPage,
      ConvalidaOreListaPage,
      VisualizzaTaskPage,
      VisualizzaAssociatiTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
