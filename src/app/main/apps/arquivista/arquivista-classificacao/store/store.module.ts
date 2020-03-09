import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {effects} from './effects';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('arquivista-classificacao-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [

    ]
})
export class ArquivistaClassificacaoStoreModule {
}
