import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';
import {ProcessoService} from '@cdk/services/processo.service';

@NgModule({
    imports: [
        StoreModule.forFeature('visualizar-processo-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ProcessoService
    ]
})
export class VisualizarProcessoStoreModule {
}
