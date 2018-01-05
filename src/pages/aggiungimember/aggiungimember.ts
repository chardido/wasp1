import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SelezionaprogettoPage} from "../selezionaprogetto/selezionaprogetto";
import { AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";
import {HomeTmPage} from "../home-tm/home-tm";
import {HomeProgettoPage} from "../home-progetto/home-progetto";

/**
 * Generated class for the AggiungimemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


export interface Progetto {
  nome: string,
  codice: string
}


@IonicPage()
@Component({
  selector: 'page-aggiungimember',
  templateUrl: 'aggiungimember.html',
})
export class AggiungimemberPage {
  private utenti: { nome: string, cognome: string, username: string}[];
  progetto: Progetto;
  codiceProgetto: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertControl: AlertController, public http: Http) {

      this.storage.get('codProgetto').then((codice) => {
          this.codiceProgetto = codice;
          this.chiamataGet();
      });

    setTimeout(this.checkProgettoSelezionato(), 1000);

  }

  getItems(searchbar) {
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.utenti = this.utenti.filter((v) => {
      if(v.username && q) {
        if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }

    chiamataGet(){

        this.http.get("http://localhost:8888/WASP/apiListaTeamMember.php").map(res => res.json())
            .subscribe(data => {
                this.utenti = data;
            }, error => {
                console.log(error);// Error getting the data
            });
    }

  checkProgettoSelezionato(){
    this.storage.get('progetto').then((progetto) => {
      if (progetto == null) {
        console.log("Seleziona il progetto prima di procedere");
        this.navCtrl.setRoot(SelezionaprogettoPage);
      } else {
        console.log("Aggiungi membro a progetto: "+progetto);
        this.progetto = {nome: progetto, codice: ""}
      }
    });
  }

  aggiungiUtente(username: string){

      let alert = this.alertControl.create({
          title: 'Team Member aggiunto!',
          subTitle: username.toUpperCase()+ ' è stato aggiunto al progetto: '+this.codiceProgetto,
          buttons: ['OK']
      });

      let alertError = this.alertControl.create({
          title: username.toUpperCase()+ ' è già associato al progetto ' + this.codiceProgetto + "!",
          buttons: ['OK']
      });

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let options = new RequestOptions({ headers:headers});

      let postParams = {
          user: username,
          codiceProgetto: this.codiceProgetto,
      }

      this.http.post("http://localhost:8888/WASP/apiAggiungiTeamMemberProgetto.php", postParams, options)
          .subscribe(data => {
              if(data['_body']==1){
                  alert.present();
                  this.navCtrl.setRoot(HomeProgettoPage);
                  console.log("Aggiungo: "+username+" al progetto: "+this.progetto.nome)
              }else{
                  alertError.present();
                  console.log("Ci sono stati dei problemi durante l'aggiunta del nuovo team member!");
              }
          }, error => {
              console.log(error);// Error getting the data
          });

      }

}
