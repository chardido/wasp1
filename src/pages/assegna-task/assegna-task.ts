import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AssegnaTaskPersonaPage} from "../assegna-task-persona/assegna-task-persona";
import { Storage } from '@ionic/storage';
import {SelezionaprogettoPage} from "../selezionaprogetto/selezionaprogetto";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";
import {HomeTmPage} from "../home-tm/home-tm";

/**
 * Generated class for the AssegnaTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assegna-task',
  templateUrl: 'assegna-task.html',
})
export class AssegnaTaskPage {
  private tasks: { wbs:string, attivita: string, dataInizio: string, dataFine: string }[];
  codiceProgetto: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {


      this.storage.get('codProgetto').then((codice) => {
          this.codiceProgetto = codice;
          this.chiamataPost();
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

      this.http.post("http://localhost:8888/WASP/apiListaTasks.php", postParams, options).map(res => res.json())
          .subscribe(data => {
              this.tasks = data;
          }, error => {
              console.log(error);// Error getting the data
          });
  }


  //todo - al posto del task gli sarà passato l'id
  assegnaTask(task: string, wbs: string){
    this.navCtrl.push(AssegnaTaskPersonaPage, {"nomeTask": task, "codiceTask": wbs});
    console.log("Task selezionato: "+task + ", codiceTask: "+ wbs);
  }
}
