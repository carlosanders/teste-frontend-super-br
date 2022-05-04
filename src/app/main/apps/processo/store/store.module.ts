import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/store/reducers';
import {effects} from 'app/main/apps/processo/store/effects';
import {TarefaService} from "../../../../../@cdk/services/tarefa.service";

@NgModule({
    imports  : [
        StoreModule.forFeature('processo-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        TarefaService
    ]
})
export class ProcessoStoreModule
{
}
