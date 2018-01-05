import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiloMemberPage } from './profilo-member';

@NgModule({
  declarations: [
    ProfiloMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiloMemberPage),
  ],
})
export class ProfiloMemberPageModule {}
