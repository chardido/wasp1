import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomeProgettoPage} from "../home-progetto/home-progetto";
import {Http, Headers, RequestOptions} from '@angular/http';


/**
 * Generated class for the CreaProgettoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crea-progetto',
  templateUrl: 'crea-progetto.html',
})
export class CreaProgettoPage {
  nomeProgetto: string;
  userDaPassare: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {
    this.storage.get('username').then((val) => {
      this.userDaPassare= val;
    });
  }

  creaProgetto(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    let options = new RequestOptions({ headers:headers});

    let postParams = {
      nome: this.nomeProgetto,
      user: this.userDaPassare
    }

    this.http.post("http://localhost:8888/WASP/apiCreaProgetto.php", postParams, options)
      .subscribe(data => {
        if(data['_body']=="0"){
            console.log("Progetto non creato!");
        }else{
          this.navCtrl.setRoot(HomeProgettoPage, {"nome": this.nomeProgetto, "codice": data['_body']});
          this.storage.set("progetto", this.nomeProgetto);
          this.storage.set("codProgetto", data['_body']);
        }
       }, error => {
        console.log(error);// Error getting the data
      });

  }

}
