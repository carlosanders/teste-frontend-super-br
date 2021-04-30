import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {reducers} from './reducers';
import {effects} from './effects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('arquivista-edit-bloco', reducers),
        EffectsModule.forFeature(effects)
    ]
})
export class ArquivistaEditBlocoStoreModule {
}
