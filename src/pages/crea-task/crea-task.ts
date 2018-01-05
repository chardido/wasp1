import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SelezionaprogettoPage} from "../selezionaprogetto/selezionaprogetto";
import {Headers, Http, RequestOptions} from "@angular/http";
import {HomeProgettoPage} from "../home-progetto/home-progetto";

/**
 * Generated class for the CreaTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Task {
  wbs: string,
  attivita: string,
    dataInizio: any
}

@IonicPage()
@Component({
  selector: 'page-crea-task',
  templateUrl: 'crea-task.html',
})
export class CreaTaskPage {
  task: Task = { wbs: '', attivita: '', dataInizio: ''};
  codiceProgetto: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertControl: AlertController, public http: Http) {

      this.task.dataInizio = new Date().toISOString();

      this.storage.get('codProgetto').then((codice) => {
          this.codiceProgetto = codice;
      });

    setTimeout(this.checkProgettoSelezionato(), 1000);
  }

  checkProgettoSelezionato(){
    this.storage.get('progetto').then((progetto) => {
      if (progetto == null) {
        console.log("Seleziona il progetto prima di procedere");
        this.navCtrl.setRoot(SelezionaprogettoPage);
      }
    });
  }

  creaTask(){

    if(this.task.attivita != "" && this.task.dataInizio != ""){
      let alert = this.alertControl.create({
        title: 'Task Creato!',
        subTitle: 'Il task ' + this.task.attivita + ' è stato creato correttamente.',
        buttons: ['Continua']
      });

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            codiceProgetto: this.codiceProgetto,
            attivita: this.task.attivita,
            dataInizio: this.task.dataInizio
        }

        this.http.post("http://localhost:8888/WASP/apiAggiungiTask.php", postParams, options)
            .subscribe(data => {
                alert.present();
                this.navCtrl.setRoot(HomeProgettoPage);
                //console.log("Nuovo task: "+this.task.attivita+ "; Data: "+this.task.dataInizio);
            }, error => {
                console.log(error);// Error getting the data
            });


    }

  }


}
