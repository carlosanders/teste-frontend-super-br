import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/pesquisa/processos/store/reducers';
import {effects} from 'app/main/apps/pesquisa/processos/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('pesquisa-processos-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class ProcessosStoreModule
{
}
