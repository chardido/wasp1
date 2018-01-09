import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {WelcomePage} from "../welcome/welcome";
import {Headers, Http, RequestOptions} from "@angular/http";
import {ConvalidaOreListaPage} from "../convalida-ore-lista/convalida-ore-lista";
import {SelezionaprogettoPage} from "../selezionaprogetto/selezionaprogetto";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private username: string;
  private infoOreInviate: {user: string, idTask: string, attivita: string, oreComunicate: number, dataInizio: string, dataFine: string}[];
  codiceProgetto: string;

  constructor(public navCtrl: NavController, private storage: Storage, public http: Http) {
    setTimeout(this.checkLogin(), 1000);

      this.storage.get('codProgetto').then((codice) => {
          this.codiceProgetto = codice;
          this.chiamataPost();
      });

  }

    chiamataPost(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            codice: this.codiceProgetto
        }

        this.http.post("http://waspunisa.altervista.org/apiListaOreComunicate.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.infoOreInviate = data;
            }, error => {
                console.log(error);// Error getting the data
            });

    }

    apriConvalidaOre(){
        this.navCtrl.setRoot(ConvalidaOreListaPage);
    }

    checkProgettoSelezionato(){
        this.storage.get('progetto').then((progetto) => {
            if (progetto == null) {
                console.log("Seleziona il progetto prima di procedere");
                this.navCtrl.setRoot(SelezionaprogettoPage);
            }
        });
    }

  checkLogin(){
    this.storage.get('username').then((name) => {
      if (name == null) {
        this.navCtrl.setRoot(WelcomePage);
      } else {
        this.username = name;
        console.log(this.username)
      }
    });
  }



}
