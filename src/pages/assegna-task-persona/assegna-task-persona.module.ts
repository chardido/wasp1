import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssegnaTaskPersonaPage } from './assegna-task-persona';

@NgModule({
  declarations: [
    AssegnaTaskPersonaPage,
  ],
  imports: [
    IonicPageModule.forChild(AssegnaTaskPersonaPage),
  ],
})
export class AssegnaTaskPersonaPageModule {}
