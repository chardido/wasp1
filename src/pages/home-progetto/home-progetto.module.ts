import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeProgettoPage } from './home-progetto';

@NgModule({
  declarations: [
    HomeProgettoPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeProgettoPage),
  ],
})
export class HomeProgettoPageModule {}
