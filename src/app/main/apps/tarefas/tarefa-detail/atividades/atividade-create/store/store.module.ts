import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/reducers';
import {effects} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/effects';
import {AssinaturaService} from '@cdk/services/assinatura.service';

@NgModule({
    imports: [
        StoreModule.forFeature('atividade-create-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        AssinaturaService
    ]
})
export class AtividadeCreateStoreModule {
}
