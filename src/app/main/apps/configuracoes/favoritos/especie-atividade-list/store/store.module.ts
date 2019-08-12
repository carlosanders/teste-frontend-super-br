import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from 'app/main/apps/configuracoes/favoritos/especie-atividade-list/store/reducers';
import { effects } from 'app/main/apps/configuracoes/favoritos/especie-atividade-list/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('especie-atividade-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class EspecieAtividadeListStoreModule
{
}
