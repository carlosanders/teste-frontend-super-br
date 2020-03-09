import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {effects} from 'app/main/apps/processo/processo-edit/transicoes/transicao-edit/store/effects';
import {reducers} from './reducers';

@NgModule({
    imports  : [
        StoreModule.forFeature('arquivista-classificacao', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class ArquivistaClassificacaoStoreModule
{
}
