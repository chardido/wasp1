import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";
import {HomeTmPage} from "../home-tm/home-tm";
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.storage.get("posizione").then((result) => {
      if(result == "PM"){
        this.navCtrl.setRoot(HomePage);
      }else if(result == "TM"){
        this.navCtrl.setRoot(HomeTmPage);
      }
    });
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

}
