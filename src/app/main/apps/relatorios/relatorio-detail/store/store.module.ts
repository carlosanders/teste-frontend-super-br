import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/relatorios/relatorio-detail/store/reducers';
import {effects} from 'app/main/apps/relatorios/relatorio-detail/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('relatorio-detail-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class RelatorioDetailStoreModule
{
}
