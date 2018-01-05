import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificaBudgetPage } from './modifica-budget';

@NgModule({
  declarations: [
    ModificaBudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificaBudgetPage),
  ],
})
export class ModificaBudgetPageModule {}
