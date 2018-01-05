import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {VisualizzaMembersPage} from "../visualizza-members/visualizza-members";

/**
 * Generated class for the ModificaRicavoRisorsaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifica-ricavo-risorsa',
  templateUrl: 'modifica-ricavo-risorsa.html',
})
export class ModificaRicavoRisorsaPage {
  nuovoRicavo: number;
  nomeMember: string;
  usernameMember: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertControl: AlertController) {
    this.nomeMember = this.navParams.get("nome");
      this.usernameMember = this.navParams.get("username");
  }


  modifica(){
      this.chiamataPost();
    //this.navCtrl.pop();
      this.navCtrl.setRoot(VisualizzaMembersPage);
  }

    chiamataPost(){

        let alert = this.alertControl.create({
            title: 'Ricavo Team Member Aggiornato!',
            subTitle: 'Il nuovo ricavo per '+ this.nomeMember.toUpperCase()+' è: '+this.nuovoRicavo+'.',
            buttons: ['Ok']
        });

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            ricavo: this.nuovoRicavo,
            user: this.usernameMember
        }

        this.http.post("http://localhost:8888/WASP/apiAggiornaRicavoMember.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                alert.present();
            }, error => {
                console.log(error);// Error getting the data
            });
    }

}
