import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {effects} from './effects';
import {reducers} from './reducers';

@NgModule({
    imports  : [
        StoreModule.forFeature('<span class="mr-4 ml-4">/</span>realizar-transicao', reducers),
        EffectsModule.forFeature(effects)
    ]
})
export class RealizarTransacaoStoreModule
{
}
