import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/tarefas/store/reducers';
import {effects} from 'app/main/apps/tarefas/store/effects';

@NgModule({
    imports: [
        StoreModule.forFeature('tarefas-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class TarefasStoreModule {
}
