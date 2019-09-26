import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { effects } from './effects';
import {AtividadeService} from '@cdk/services/atividade.service';

@NgModule({
    imports  : [
        StoreModule.forFeature('documento-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        AtividadeService
    ]
})
export class DocumentoStoreModule
{
}
