import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/pesquisa/componentes-digitais/store/reducers';
import {effects} from 'app/main/apps/pesquisa/componentes-digitais/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('pesquisa-componentes-digitais-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class ComponentesDigitaisStoreModule
{
}
