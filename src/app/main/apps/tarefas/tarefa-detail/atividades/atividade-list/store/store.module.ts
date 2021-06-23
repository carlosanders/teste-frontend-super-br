import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store/reducers';
import {effects} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('atividade-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class AtividadeListStoreModule
{
}
