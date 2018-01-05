import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the VisualizzaAssociatiTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizza-associati-task',
  templateUrl: 'visualizza-associati-task.html',
})
export class VisualizzaAssociatiTaskPage {
  codiceTask: string;
  codiceProgetto: string;
  private utenti: { cognome: string, nome: string, user: string, posizione: number, costo: string, ricavo: string}[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {
    this.codiceTask = this.navParams.get("idTask");


    this.storage.get('codProgetto').then((cod) => {
      this.codiceProgetto = cod;
      console.log("codiceTask: "+this.codiceTask);
      console.log("codiceProgetto: "+cod);

      this.chiamataPost();
    });

  }

  chiamataPost(){
    console.log("Chiamata<br>Progetto: "+this.codiceProgetto+"<br>Task: "+this.codiceTask);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    let options = new RequestOptions({ headers:headers});

    let postParams = {
      codiceProgetto: this.codiceProgetto,
      codiceTask: this.codiceTask,
    }

    this.http.post("http://localhost:80/WASP/apiListaMembriAssociatiAlTask.php", postParams, options).map(res => res.json())
        .subscribe(data => {
          this.utenti = data;
        }, error => {
          console.log(error);// Error getting the data
        });
  }

  ionViewDidLoad() {
  }

}
