import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-relatorio-view/store/reducers';
import {effects} from 'app/main/apps/processo/processo-relatorio-view/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('processo-relatorio-view-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class ProcessoRelatorioViewStoreModule
{
}
