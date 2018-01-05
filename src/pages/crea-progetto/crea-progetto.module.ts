import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaProgettoPage } from './crea-progetto';

@NgModule({
  declarations: [
    CreaProgettoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreaProgettoPage),
  ],
})
export class CreaProgettoPageModule {}
