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
  private tasks: {attivita: string, dataInizio: string, oreComunicate: number}[];
  private notifiche: { user: string, attivita: string, dataInizio:string, nome: string}[];
  private ore: { attivita: string, oreComunicate: number, nome: string, user: string}[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {

    setTimeout(this.checkLogin(), 1000);

<<<<<<< HEAD
=======

>>>>>>> 7502c6162eda1b0d9657ccc5bd0de9f67bac3bda
  }

    chiamataPostCheckOre(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            username: this.username,
        }

        this.http.post("http://waspunisa.altervista.org/apiNotificaOreConvalidaOMeno.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.ore = data;
            }, error => {
                console.log(error);// Error getting the data
            });
    }

    chiamataPostNotifiche(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            username: this.username,
        }

        this.http.post("http://waspunisa.altervista.org/apiListaNuoviTaskTM.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.notifiche = data;
            }, error => {
                console.log(error);// Error getting the data
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
            username: this.username
        }

        this.http.post("http://waspunisa.altervista.org/apiTasksInCorsoTeamMember.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.tasks = data;
            }, error => {
                console.log(error);// Error getting the data
            });
    }

  dettaglioTask(attivita: string, dataInizio: string, oreComunicate){
    this.navCtrl.push(DettaglioTaskPage, {"attivita":attivita, "dataInizio":dataInizio, "oreComunicate":oreComunicate});
  }

  checkLogin(){
    this.storage.get('username').then((name) => {
      if (name == null) {
        this.navCtrl.setRoot(WelcomePage);
      } else {
        this.username = name;
        this.chiamataPost();
        this.chiamataPostNotifiche();
        this.chiamataPostCheckOre();
        console.log(this.username)
      }
    });
  }
}

