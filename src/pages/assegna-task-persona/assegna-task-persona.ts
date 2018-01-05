import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AssegnaTaskPersonaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assegna-task-persona',
  templateUrl: 'assegna-task-persona.html',
})
export class AssegnaTaskPersonaPage {
  private utenti: { cognome: string, nome: string, user: string, costo: string}[];
  nomeTask = this.navParams.get("nomeTask");
  codiceTask = this.navParams.get("codiceTask");
  codiceProgetto : string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertControl: AlertController, private storage: Storage, public http: Http) {

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
            codice: this.codiceProgetto,
        }

        this.http.post("http://localhost:8888/WASP/apiListaMembriAssociatiAlProgetto.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.utenti = data;
                console.log(this.utenti);
            }, error => {
                console.log(error);// Error getting the data
            });
    }

  assegnaTask(username: string){

    let alert = this.alertControl.create({
      title: 'Task Assegnato',
      subTitle: 'Il task '+ this.nomeTask+' è stato assegnato a '+username.toUpperCase()+'.',
      buttons: ['Continua']
    });

    let alertError = this.alertControl.create({
      title: (username).toUpperCase()+ ' è già associato a questo Task!',
      buttons: ['OK']
    });

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let options = new RequestOptions({ headers:headers});

      let postParams = {
          user: username,
          codiceProgetto: this.codiceProgetto,
          codiceTask: this.codiceTask
      }

      this.http.post("http://localhost:8888/WASP/apiAssegnaTaskAlMember.php", postParams, options)
          .subscribe(data => {
              if(data['_body']==1){
                  alert.present();
                  console.log("Task: "+ this.nomeTask+" assegnato a: "+username);
              }else{
                  alertError.present();
                  console.log("Ci sono stati dei problemi durante l'associazione del task!");
              }
          }, error => {
              console.log(error);// Error getting the data
          });


  }


}
