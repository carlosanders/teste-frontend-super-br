import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/tarefas/store/reducers';
import {effects} from 'app/main/apps/tarefas/store/effects';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

@NgModule({
    imports: [
        StoreModule.forFeature('tarefas-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        VinculacaoEtiquetaService
    ]
})
export class TarefasStoreModule {
}
