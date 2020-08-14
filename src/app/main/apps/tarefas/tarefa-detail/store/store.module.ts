import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/tarefas/tarefa-detail/store/reducers';
import {effects} from 'app/main/apps/tarefas/tarefa-detail/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('tarefa-detail-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class TarefaDetailStoreModule
{
}
