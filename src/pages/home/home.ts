import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {WelcomePage} from "../welcome/welcome";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private username: string;
  private notifiche: { titolo: string, descrizione: string, data:string}[];


  constructor(public navCtrl: NavController, private storage: Storage) {
    setTimeout(this.checkLogin(), 1000);

    this.notifiche = [
      {"titolo":"Comunicazione Ore", "descrizione":"Umberto Picariello ha comunicato le ore per il task 1", "data":"03/01/2018"},
      {"titolo":"Comunicazione Ore", "descrizione":"Fabiano Pecorelli ha comunicato le ore per il task 2", "data":"02/01/2018"},
    ];

  }

  checkLogin(){
    this.storage.get('username').then((name) => {
      if (name == null) {
        this.navCtrl.setRoot(WelcomePage);
      } else {
        this.username = name;
        console.log(this.username)
      }
    });
  }



}
