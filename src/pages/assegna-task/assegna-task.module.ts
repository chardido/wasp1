import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssegnaTaskPage } from './assegna-task';

@NgModule({
  declarations: [
    AssegnaTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AssegnaTaskPage),
  ],
})
export class AssegnaTaskPageModule {}
