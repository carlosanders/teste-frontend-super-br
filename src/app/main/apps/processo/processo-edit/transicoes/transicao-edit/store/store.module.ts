import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/transicoes/transicao-edit/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/transicoes/transicao-edit/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('transicao-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class TransicaoEditStoreModule
{
}
