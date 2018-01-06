import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfiloMemberPage} from "../profilo-member/profilo-member";
import { Storage } from '@ionic/storage';
import {SelezionaprogettoPage} from "../selezionaprogetto/selezionaprogetto";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the VisualizzaMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizza-members',
  templateUrl: 'visualizza-members.html',
})
export class VisualizzaMembersPage {
  private utenti: { cognome: string, nome: string, user: string, posizione: number, costo: string, ricavo: string}[];
  codiceProgetto : string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {

    setTimeout(this.checkProgettoSelezionato(), 1000);

      this.storage.get('codProgetto').then((cod) => {
          this.codiceProgetto = cod;
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
          codice: this.codiceProgetto,
      }

      this.http.post("http://localhost:8888/WASP/apiVisualizzaMember.php", postParams, options).map(res => res.json())
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
      }
    });
  }

  selezionaPersona(cognome: string, nome:string, posizione:string, costo:number, ricavo:number, username:string){
    this.navCtrl.push(ProfiloMemberPage, {"cognome":cognome, "nome":nome, "ruolo":posizione, "costo":costo, "ricavo":ricavo, "user":username});
    console.log("Selezionato: "+nome);
  }

}
