import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {ModificaRicavoRisorsaPage} from "../modifica-ricavo-risorsa/modifica-ricavo-risorsa";
import {ProfiloMemberPage} from "../profilo-member/profilo-member";
import {HomeTmPage} from "../home-tm/home-tm";
import {VisualizzaMembersPage} from "../visualizza-members/visualizza-members";

/**
 * Generated class for the ModificaRisorsaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifica-risorsa',
  templateUrl: 'modifica-risorsa.html',
  })
  export class ModificaRisorsaPage {
    nuovoCosto: number;
    nomeMember: string;
    usernameMember: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertControl: AlertController) {
      this.nomeMember = this.navParams.get("nome");
      this.usernameMember = this.navParams.get("username");

      console.log("user: " + this.usernameMember);
    }

    modifica(){
        this.chiamataPost();
        //this.navCtrl.pop();
        this.navCtrl.setRoot(VisualizzaMembersPage);
    }

    chiamataPost(){

        let alert = this.alertControl.create({
            title: 'Costo Team Member Aggiornato!',
            subTitle: 'Il nuovo costo per '+ this.nomeMember.toUpperCase()+' è: '+this.nuovoCosto+'.',
            buttons: ['Ok']
        });

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            costo: this.nuovoCosto,
            user: this.usernameMember
        }

        this.http.post("http://localhost:8888/WASP/apiAggiornaCostoMember.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                alert.present();
            }, error => {
                console.log(error);// Error getting the data
            });
    }


}
