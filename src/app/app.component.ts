import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, MenuController, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { Storage } from '@ionic/storage';
import { SelezionaprogettoPage } from "../pages/selezionaprogetto/selezionaprogetto";
import { HomeProgettoPage } from '../pages/home-progetto/home-progetto';
import { CreaProgettoPage } from '../pages/crea-progetto/crea-progetto';
import { AggiungimemberPage } from '../pages/aggiungimember/aggiungimember';
import { CreaTaskPage } from '../pages/crea-task/crea-task';
import { AssegnaTaskPage } from '../pages/assegna-task/assegna-task';
import { ModificaBudgetPage } from '../pages/modifica-budget/modifica-budget';
import { VisualizzaMembersPage } from '../pages/visualizza-members/visualizza-members';
import { InvioOreSelTaskPage } from '../pages/invio-ore-sel-task/invio-ore-sel-task';
import { HomeTmPage } from '../pages/home-tm/home-tm';
import { HomePage } from "../pages/home/home";
import { ConvalidaOreListaPage } from "../pages/convalida-ore-lista/convalida-ore-lista";
import { VisualizzaTaskPage } from "../pages/visualizza-task/visualizza-task";


export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  name?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pagesProgetto: PageInterface[] = [
    { title: 'Dashboard', component: HomeProgettoPage, icon: 'ios-home-outline'},
    { title: 'Aggiungi Team Member', component: AggiungimemberPage, icon: 'ios-person-add-outline'},
    { title: 'Crea Task', component: CreaTaskPage, icon: 'ios-add-outline'},
    { title: 'Assegna Task', component: AssegnaTaskPage, icon: 'ios-person-add-outline'},
      { title: 'Dettagli Tasks', component: VisualizzaTaskPage, icon: 'ios-list-outline'},
    { title: 'Visualizza Members', component: VisualizzaMembersPage, icon: 'ios-people-outline'},
    { title: 'Aggiorna Budget', component: ModificaBudgetPage, icon: 'ios-cash-outline'},
    { title: 'Convalida Ore', component: ConvalidaOreListaPage, icon: 'ios-clock-outline'},
  ];

  pagesProgettoTM: PageInterface[] = [
    { title: 'Home', component: HomeTmPage, icon: 'ios-home-outline'},
    { title: 'Comunica ore', component: InvioOreSelTaskPage, icon: 'ios-time-outline'},
  ];

  pagesGenerale: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'ios-home-outline'},
    { title: 'Crea Progetto', component: CreaProgettoPage, icon: 'ios-add-outline'},
    { title: 'Seleziona Progetto', component: SelezionaprogettoPage, icon: 'ios-list-box-outline'},
  ];

  pagesImpostazioni = [
    { title: 'Logout', component: WelcomePage, icon: 'log-out', logsOut: true }
  ];


  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private storage: Storage,
      public menu: MenuController,
      public events: Events
  ) {
    this.storage.get("posizione").then((result) => {
      if(result == "PM"){
        this.enableMenu(true);
      }else{
        this.enableMenu(false);
      }
    });

    this.initializeApp();
    this.listenToLoginEvents();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.logout();
    }
  }

  logout(){
    this.storage.clear();
    this.nav.setRoot(WelcomePage);
  }

  /**
   * IF TRUE --> LOGGED AS PM
   * @param loggedPM
   */
  enableMenu(loggedPM: boolean) {
    this.menu.enable(loggedPM, 'loggedPM');
    this.menu.enable(!loggedPM, 'loggedTM');
  }

  listenToLoginEvents() {
    this.events.subscribe('user:pm', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:tm', () => {
      this.enableMenu(false);
    });
  }

}
