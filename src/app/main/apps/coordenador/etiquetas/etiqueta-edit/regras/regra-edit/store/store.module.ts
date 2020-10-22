import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';

@NgModule({
    imports: [
        StoreModule.forFeature('regra-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class RegraEditStoreModule {
}
