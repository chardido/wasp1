import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {WelcomePage} from "../welcome/welcome";
import {DettaglioTaskPage} from "../dettaglio-task/dettaglio-task";
import {Headers, Http, RequestOptions} from "@angular/http";

/**
 * Generated class for the HomeTmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-tm',
  templateUrl: 'home-tm.html',
})
export class HomeTmPage {
  private username: string;
  private tasks: { nome: string, attivita: string, dataInizio: string, oreComunicate: number}[];
  private notifiche: { titolo: string, descrizione: string, data:string}[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {

    setTimeout(this.checkLogin(), 1000);


    this.notifiche = [
      {"titolo":"Task", "descrizione":"Ti è stato assegnato un nuovo task", "data":"03/01/2018"},
      {"titolo":"Comunicazione Ore", "descrizione":"Le ore comunicate per il Task 1 sono state accettate", "data":"02/01/2018"},
      {"titolo":"Comunicazione Ore", "descrizione":"Le ore comunicate per il Task 2 sono state rifiutate", "data":"01/01/2018"},
    ];
  }

    chiamataPost(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            username: this.username
        }

        this.http.post("http://localhost:8888/WASP/apiTasksInCorsoTeamMember.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.tasks = data;
            }, error => {
                console.log(error);// Error getting the data
            });
    }

  dettaglioTask(nomeProgetto: string, attivita: string, dataInizio: string, oreComunicate){
    this.navCtrl.push(DettaglioTaskPage, {"nomeProgetto":nomeProgetto, "attivita":attivita, "dataInizio":dataInizio, "oreComunicate":oreComunicate});
  }

  checkLogin(){
    this.storage.get('username').then((name) => {
      if (name == null) {
        this.navCtrl.setRoot(WelcomePage);
      } else {
        this.username = name;
        this.chiamataPost();
        console.log(this.username)
      }
    });
  }
}

