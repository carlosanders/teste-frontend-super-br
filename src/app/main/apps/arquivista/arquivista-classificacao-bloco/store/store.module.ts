import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';



@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      StoreModule.forFeature('<span class="mr-4 ml-4">/</span>arquivista-classificacao-bloco', reducers),
      EffectsModule.forFeature(effects)
  ]
})
export class ArquivistaClassificacaoBlocoStoreModule { }
