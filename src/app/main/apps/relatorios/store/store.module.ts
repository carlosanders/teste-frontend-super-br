import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/relatorios/store/reducers';
import {effects} from 'app/main/apps/relatorios/store/effects';

@NgModule({
    imports: [
        StoreModule.forFeature('relatorios-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class RelatoriosStoreModule {
}
