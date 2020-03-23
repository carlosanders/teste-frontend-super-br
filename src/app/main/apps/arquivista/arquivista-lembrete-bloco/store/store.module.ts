import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {reducers} from './reducers';
import {effects} from './effects';



@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      StoreModule.forFeature('app-lembretes-bloco-form', reducers),
      EffectsModule.forFeature(effects)
  ]
})
export class LembreteBlocoStoreModule { }
