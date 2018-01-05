import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizzaMembersPage } from './visualizza-members';

@NgModule({
  declarations: [
    VisualizzaMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizzaMembersPage),
  ],
})
export class VisualizzaMembersPageModule {}
