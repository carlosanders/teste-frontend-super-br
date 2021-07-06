import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';
import {InteressadoService} from "../../../../../@cdk/services/interessado.service";
import {AssuntoService} from "../../../../../@cdk/services/assunto.service";

@NgModule({
    imports: [
        StoreModule.forFeature('board-tarefas-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        InteressadoService,
        AssuntoService
    ]
})
export class BoardTarefasStoreModule {
}
