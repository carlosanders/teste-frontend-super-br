import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import {reducers, ProcessoDetailState} from './reducers';
import { effects } from './effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('protocolo-externo-detail-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class ProcessoDetailStoreModule
{
}
