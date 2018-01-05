import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage} from "../home/home";
import {Http, Headers, RequestOptions} from '@angular/http';
import {HomeTmPage} from "../home-tm/home-tm";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


export interface UserOptions {
    username: string,
    password: string
}

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    login: UserOptions = {username: '', password:''};

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http, public events: Events) {
    }

    logForm() {
        if(this.login.username != "" && this.login.password != ""){
            //effettuare il controllo

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            headers.append('Access-Control-Allow-Origin' , '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            let options = new RequestOptions({ headers:headers});

            let postParams = {
                username: this.login.username,
                password: this.login.password,
            }

            this.http.post("http://localhost:8888/WASP/apiLogin.php", postParams, options)
                .subscribe(data => {
                    if(data['_body']=="PM"){
                        this.storage.set('username',this.login.username);
                        this.storage.set('posizione',"PM");
                        this.events.publish('user:pm');
                        this.navCtrl.setRoot(HomePage);
                    }else if(data['_body']=="TM"){
                        this.events.publish('user:tm');
                        this.storage.set('username',this.login.username);
                        this.storage.set('posizione',"TM");
                        this.navCtrl.setRoot(HomeTmPage);
                    }else{
                        console.log("Inserisci username e/o password CORRETTI");
                    }
                    //console.log(data);
                }, error => {
                    console.log(error);// Error getting the data
                });


            //this.navCtrl.setRoot(HomePage);
            //console.log(this.login);
        }else{
            console.log("Inserisci username e/o password");
        }
    }




}
