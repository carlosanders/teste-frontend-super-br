import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/documentos-avulsos/responder/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/documentos-avulsos/responder/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('responder-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class DocumentoAvulsoResponderStoreModule
{
}
