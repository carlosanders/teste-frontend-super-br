import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import {reducers, DocumentoAvulsoCreateState} from './reducers';
import { effects } from './effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('documento-avulso-create-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class DocumentoAvulsoCreateStoreModule
{
}
