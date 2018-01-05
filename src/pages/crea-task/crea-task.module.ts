import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaTaskPage } from './crea-task';

@NgModule({
  declarations: [
    CreaTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(CreaTaskPage),
  ],
})
export class CreaTaskPageModule {}
