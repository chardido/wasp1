import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeTmPage } from './home-tm';

@NgModule({
  declarations: [
    HomeTmPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeTmPage),
  ],
})
export class HomeTmPageModule {}
