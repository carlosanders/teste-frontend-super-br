import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/vinculacoes-processos/vinculacao-processo-list/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/vinculacoes-processos/vinculacao-processo-list/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('vinculacao-processo-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class VinculacaoProcessoListStoreModule
{
}
