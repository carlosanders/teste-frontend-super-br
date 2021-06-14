import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/relatorios/relatorio-detail/relatorio-view/store/reducers';
import {effects} from 'app/main/apps/relatorios/relatorio-detail/relatorio-view/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('relatorio-view-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class RelatorioViewStoreModule
{
}
