import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {WelcomePage} from "../welcome/welcome";
import {HomeTmPage} from "../home-tm/home-tm";

/**
 * Generated class for the InvioOrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invio-ore',
  templateUrl: 'invio-ore.html',
})
export class InvioOrePage {
  taskSelezionato: string;
  idTaskSelezonato: string;
  oreInserite: number;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertControl: AlertController, public http: Http) {
    this.taskSelezionato = this.navParams.get("task");
    this.idTaskSelezonato = this.navParams.get("idTask");
    this.username = this.navParams.get("username");
  }

  comunicaOre(){
    if(this.oreInserite != null){
      let alert = this.alertControl.create({
        title: 'Ore comunicate!',
        subTitle: ' Ore comunicate al Project Manager: <strong>' + this.oreInserite + '</strong>.',
        buttons: ['Ok']
      });

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            idTask: this.idTaskSelezonato,
            ore: this.oreInserite,
            user: this.username
        }

        this.http.post("http://localhost:8888/WASP/apiInviaOre.php", postParams, options)
            .subscribe(data => {
                alert.present();
                this.navCtrl.setRoot(HomeTmPage);
                //console.log("Comunicate "+this.oreInserite+" ore per il task: "+this.taskSelezionato);
            }, error => {
                console.log(error);// Error getting the data
            });



    }
  }


}
