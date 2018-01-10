import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {HomeTmPage} from "../home-tm/home-tm";
import {Storage} from "@ionic/storage";
import {WelcomePage} from "../welcome/welcome";
import {HomePage} from "../home/home";

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

      this.http.post("http://waspunisa.altervista.org/apiListaOreComunicate.php", postParams, options).map(res => res.json())
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
            this.chiamataPostConvalida(idTask, userUtente, attivita, ore);
              let alert = this.alertControl.create({
                  title: 'Ore Convalidate!',
                  subTitle: 'Ore convalidate ' + ore + ' per il task '+ attivita+'.',
                  buttons: ['Ok']
              });
              alert.present();
              this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'Non convalidare',
          handler: () => {
              this.chiamataPostNonConvalidare(idTask, userUtente, attivita);
              let alert2 = this.alertControl.create({
                  title: 'Ore Non Convalidate!',
                  subTitle: 'Ore non convalidate ' + ore + ' per il task '+ attivita+'.',
                  buttons: ['Ok']
              });
              alert2.present();
              this.navCtrl.setRoot(HomePage);
            console.log('Non convalida');
          }
        }
      ]
    });
    alert.present();
  }

    chiamataPostNonConvalidare(idTask: string, user: string, attivita: string){

        //console.log("id: " + idTask + "; user: " + user + ", attivi: " + attivita);
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            idTask: idTask,
            user: user,
            codProgetto: this.codiceProgetto
        }

        this.http.post("http://waspunisa.altervista.org/apiNonConvalidareOre.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                if(data['_body']==1){
                    console.log("Ore NON convalidate");
                }else{
                    //console.log("Errore convalida");
                }
            }, error => {
                console.log(error);// Error getting the data
            });
    }

    chiamataPostConvalida(idTask: string, user: string, attivita: string, ore: number){

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            idTask: idTask,
            user: user,
            ore: ore,
            codProgetto: this.codiceProgetto
        }

        this.http.post("http://waspunisa.altervista.org/apiConvalidaOre.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                if(data['_body']==1){
                    console.log("Convalidate");
                }else{
                    //console.log("Errore convalida");
                }
            }, error => {
                console.log(error);// Error getting the data
            });

    }


}
