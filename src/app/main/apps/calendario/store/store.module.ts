import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/calendario/store/reducers';
import {effects} from 'app/main/apps/calendario/store/effects';

@NgModule({
    imports: [
        StoreModule.forFeature('calendario-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class CalendarioStoreModule {
}
