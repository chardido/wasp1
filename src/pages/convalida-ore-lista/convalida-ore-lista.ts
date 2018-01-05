import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {HomeTmPage} from "../home-tm/home-tm";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ConvalidaOreListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-convalida-ore-lista',
  templateUrl: 'convalida-ore-lista.html',
})
export class ConvalidaOreListaPage {
  private oreInviate: {user: string, idTask: string, attivita: string, oreComunicate: number}[];
  codiceProgetto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertControl: AlertController, public http: Http) {

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
          codice: this.codiceProgetto
      }

      this.http.post("http://localhost:80/WASP/apiListaOreComunicate.php", postParams, options).map(res => res.json())
          .subscribe(data => {
              this.oreInviate = data;
          }, error => {
              console.log(error);// Error getting the data
          });

  }


  convalidaOre( userUtente: string, ore: number, attivita: string, idTask: string,) {
    let alert = this.alertControl.create({
      title: 'Convalida Ore',
      message: userUtente+" ha dichiarato <strong>"+ore+"</strong> ore per il task: " + attivita +". <br> Vuoi convalidargliele?",
      buttons: [
        {
          text: 'Convalida',
          role: 'cancel',
          handler: () => {
            console.log('Convalida');
            this.chiamataPostConvalida(idTask, userUtente, attivita);
          }
        },
        {
          text: 'Non convalidare',
          handler: () => {
            console.log('Non convalida');
          }
        }
      ]
    });
    alert.present();
  }

    chiamataPostConvalida(idTask: string, user: string, attivita: string){

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            idTask: idTask,
            user: user
        }

        this.http.post("http://localhost:80/WASP/apiConvalidaOre.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                if(data['_body']==1){
                    let alert = this.alertControl.create({
                        title: 'Ore Convalidate!',
                        subTitle: 'Ore convalidate per il task '+ attivita+'.',
                        buttons: ['Ok']
                    });
                    alert.present();
                }else{
                    console.log("Errore convalida");
                }
            }, error => {
                console.log(error);// Error getting the data
            });

    }


}
