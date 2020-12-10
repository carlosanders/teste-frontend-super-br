import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {reducers} from './reducers';
import {effects} from './effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';



@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      StoreModule.forFeature('criar-data-prevista-transicao', reducers),
      EffectsModule.forFeature(effects)
  ]
})
export class CriarDataPrevistaStoreModule { }
