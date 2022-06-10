import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-solicitar-dossies/store/reducers';
import {effects} from 'app/main/apps/processo/processo-solicitar-dossies/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('processo-solicitar-dossies-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class ProcessoSolicitarDossiesStoreModule
{
}
