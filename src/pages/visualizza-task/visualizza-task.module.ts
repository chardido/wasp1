import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizzaTaskPage } from './visualizza-task';

@NgModule({
  declarations: [
    VisualizzaTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizzaTaskPage),
  ],
})
export class VisualizzaTaskPageModule {}
