import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DettaglioTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dettaglio-task',
  templateUrl: 'dettaglio-task.html',
})
export class DettaglioTaskPage {
  attivita: string;
  dataInizio: string;
  nomeProgetto: string;
  oreComunicate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nomeProgetto = this.navParams.get("nomeProgetto");
    this.attivita = this.navParams.get("attivita");
    this.dataInizio = this.navParams.get("dataInizio");
    this.oreComunicate = this.navParams.get("oreComunicate");
  }


}
