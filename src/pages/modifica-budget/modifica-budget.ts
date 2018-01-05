import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SelezionaprogettoPage } from "../selezionaprogetto/selezionaprogetto";
import {Http, Headers, RequestOptions} from '@angular/http';
import {HomeProgettoPage} from "../home-progetto/home-progetto";

/**
 * Generated class for the ModificaBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifica-budget',
  templateUrl: 'modifica-budget.html',
})
export class ModificaBudgetPage {
  nomeProgetto: string;
  nuovoBudget: number;
  codiceProgetto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertControl: AlertController, public http: Http) {

      this.storage.get('codProgetto').then((codice) => {
          this.codiceProgetto = codice;;
      });

    setTimeout(this.checkProgettoSelezionato(), 1000);
  }

  modificaBudget(){
    if(this.nuovoBudget != null){

      let alert = this.alertControl.create({
        title: 'Budget Aggiornato!',
        subTitle: 'Nuovo budget: ' + this.nuovoBudget +"€",
        buttons: ['Ok']
      });

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            codice: this.codiceProgetto,
            budget: this.nuovoBudget
        }

        this.http.post("http://localhost:8888/WASP/apiAggiornaBudgetProgetto.php", postParams, options)
            .subscribe(data => {
              alert.present();
                this.navCtrl.setRoot(HomeProgettoPage);
            }, error => {
                console.log(error);// Error getting the data
            });

      console.log("Nuovo budget: "+this.nuovoBudget+"€")
    }
  }

  checkProgettoSelezionato(){
    this.storage.get('progetto').then((progetto) => {
      if (progetto == null && this.nomeProgetto == null) {
        console.log("NON HAI SCELTO");
        this.navCtrl.setRoot(SelezionaprogettoPage);
      } else {
        this.nomeProgetto = progetto;
        console.log("Progetto aperto: "+progetto);
      }
    });
  }
}
