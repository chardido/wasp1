import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {InvioOrePage} from "../invio-ore/invio-ore";
import {Headers, Http, RequestOptions} from "@angular/http";
import {WelcomePage} from "../welcome/welcome";
import {Storage} from "@ionic/storage";


/**
 * Generated class for the InvioOreSelTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invio-ore-sel-task',
  templateUrl: 'invio-ore-sel-task.html',
})
export class InvioOreSelTaskPage {
    private tasks: { idTask: string, nome: string, attivita: string, dataInizio: string, oreComunicate: number}[];
    private username: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http, public alertControl: AlertController) {

      this.storage.get('username').then((name) => {
          this.username = name;
          this.chiamataPost();
      });

  }

  inviaOre(username: string, task: string, idTask: string, oreComunicate: number){
      if(oreComunicate == null){
          this.navCtrl.push(InvioOrePage, {"username": username, "task": task, "idTask": idTask});
      }else{
          let alert = this.alertControl.create({
              title: 'Ore già comunicate!',
              subTitle: ' Ore comunicate al Project Manager: <strong>' + oreComunicate + '</strong>.<br/> In attesa di convalida.',
              buttons: ['Ok']
          });
          alert.present();
      }

    //console.log("Selezionato: "+task+ ", IdTask:" + idTask);
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


}
