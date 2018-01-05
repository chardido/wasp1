import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ModificaRisorsaPage} from "../modifica-risorsa/modifica-risorsa";
import {ModificaRicavoRisorsaPage} from "../modifica-ricavo-risorsa/modifica-ricavo-risorsa";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ProfiloMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilo-member',
  templateUrl: 'profilo-member.html',
})
export class ProfiloMemberPage {
  usernameMembro: string;
  cognomeMembro: string;
  nomeMembro: string;
  costoMembro: string;
  ricavoMembro: string;
  ruoloMembro: number;
  private tasks: { codice: string, attivita: string, nome: string, dataInizio: string}[];
  codiceProgetto : string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {
    this.usernameMembro = this.navParams.get("user");
    this.cognomeMembro = this.navParams.get("cognome");
    this.nomeMembro = this.navParams.get("nome");
    this.costoMembro = this.navParams.get("costo");
    this.ruoloMembro = this.navParams.get("ruolo");
    this.ricavoMembro = this.navParams.get("ricavo");

      this.storage.get('codProgetto').then((cod) => {
          this.codiceProgetto = cod;
          this.chiamataPost();
      });

  }

  modificaCosto(){
    this.navCtrl.push(ModificaRisorsaPage, {"nome":this.nomeMembro, "username":this.usernameMembro});
  }
  modificaRicavo(){
    this.navCtrl.push(ModificaRicavoRisorsaPage, {"nome":this.nomeMembro, "username":this.usernameMembro});
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
            username: this.usernameMembro
        }

        this.http.post("http://localhost:8888/WASP/apiListaTasksTeamMember.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.tasks = data;
            }, error => {
                console.log(error);// Error getting the data
            });
    }

}
