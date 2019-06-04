import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import {reducers, TarefaCreateState} from 'app/main/apps/tarefas/tarefa-create/store/reducers';
import { effects } from 'app/main/apps/tarefas/tarefa-create/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('tarefa-create-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class TarefaCreateStoreModule
{
}
