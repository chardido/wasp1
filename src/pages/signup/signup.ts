import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HomePage} from "../home/home";
import {HomeTmPage} from "../home-tm/home-tm";



/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



export interface UserOptionsRegister {
    username: string,
    password: string,
    nome: string,
    cognome: string,
    tipo: number
}
@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    signup: UserOptionsRegister = {username: '', password:'', nome:'', cognome:'', tipo:0};

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http, public events: Events) {
    }


    logForm() {
        if(this.signup.username != "" && this.signup.password != "" && this.signup.nome != "" && this.signup.cognome != ""){

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            headers.append('Access-Control-Allow-Origin' , '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            let options = new RequestOptions({ headers:headers});

            let postParams = {
                nome: this.signup.nome,
                cognome: this.signup.cognome,
                username: this.signup.username,
                password: this.signup.password,
                tipo: this.signup.tipo,
            }

            this.http.post("http://localhost:8888/WASP/apiRegistraUtente.php", postParams, options)
                .subscribe(data => {
                    if(data['_body']==1){
                        this.storage.set('username',this.signup.username);
                        this.storage.set('posizione',this.signup.tipo);
                        if(this.signup.tipo == 0){
                            this.events.publish('user:pm');
                            this.navCtrl.setRoot(HomePage);
                        }else{
                            this.events.publish('user:tm');
                            this.navCtrl.setRoot(HomeTmPage);
                        }
                    }else{
                        console.log(data['_body'])
                        console.log("Errore durante la registrazione!");
                    }
                }, error => {
                    console.log(error);// Error getting the data
                });

        }else{
            console.log("Controlla di aver completato tutti i campi");
        }
    }

}
