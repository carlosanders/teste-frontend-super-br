import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers, ModeloEditDadosBasicosState } from './reducers';
import { effects } from './effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('documento-modelo-edit-dados-basicos-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class DocumentoModeloEditDadosBasicosStoreModule
{
}