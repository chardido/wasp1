import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomeProgettoPage} from "../home-progetto/home-progetto";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SelezionaprogettoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**
 * Generated class for the SelezionaprogettoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-selezionaprogetto',
  templateUrl: 'selezionaprogetto.html',
})
export class SelezionaprogettoPage {


  private progetti: { nome: string, codice: string }[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {

     this.http.get("http://localhost:8888/WASP/apiListaProgetti.php").map(res => res.json())
         .subscribe(data => {
             this.progetti = data;
             console.log(data);
         }, error => {
             console.log(error);// Error getting the data
         });

  }

  apriProgetto(codice: string, nome:string){
    console.log("Apro progetto: "+codice+" con nome: "+nome);
    this.storage.set("progetto",nome); //<-- TODO qui va inserito il codice
    this.storage.set("codProgetto",codice); //<-- TODO qui va inserito il codice
    this.navCtrl.setRoot(HomeProgettoPage, {"nome": nome, "codice": codice});
  }



}
