import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DettaglioTaskPage } from './dettaglio-task';

@NgModule({
  declarations: [
    DettaglioTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(DettaglioTaskPage),
  ],
})
export class DettaglioTaskPageModule {}
