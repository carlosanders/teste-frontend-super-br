import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {effects} from './effects';
import {reducers} from './reducers';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('app-lembretes-form', reducers),
        EffectsModule.forFeature(effects)
    ]
})
export class LembreteStoreModule {
}
