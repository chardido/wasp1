import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VisualizzaAssociatiTaskPage} from "../visualizza-associati-task/visualizza-associati-task";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the VisualizzaTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizza-task',
  templateUrl: 'visualizza-task.html',
})
export class VisualizzaTaskPage {
    private tasks: { user: string, wbs: string, idTask: string, attivita: string, dataInizio: string, dataFine: string}[];
    codiceProgetto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {
      this.storage.get('codProgetto').then((codice) => {
          this.codiceProgetto = codice;
          console.log("codProgetto: " + codice);
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

        this.http.post("http://waspunisa.altervista.org/apiListaTasksAssociati.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.tasks = data;
            }, error => {
                console.log(error);// Error getting the data
            });
    }

  visualizzaAssociati(user: string, attivitaTask: string, idTask: string, codProgetto: string){
      this.navCtrl.push(VisualizzaAssociatiTaskPage,{"user": user, "attivita":attivitaTask, "idTask":idTask, "codProgetto": codProgetto});
      //console.log("Invio idTask: "+idTask + ", attivita: " + attivitaTask);
  }

}
