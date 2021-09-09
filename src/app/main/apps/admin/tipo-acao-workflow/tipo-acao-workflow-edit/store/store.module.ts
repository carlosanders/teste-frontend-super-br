import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';

@NgModule({
    imports: [
        StoreModule.forFeature('tipo-acao-workflow-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class TipoAcaoWorkflowEditStoreModule {
}
