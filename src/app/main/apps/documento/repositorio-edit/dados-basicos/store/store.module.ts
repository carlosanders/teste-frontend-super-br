import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers, RepositorioEditDadosBasicosState } from './reducers';
import { effects } from './effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('documento-repositorio-edit-dados-basicos-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class DocumentoRepositorioEditDadosBasicosStoreModule
{
}
