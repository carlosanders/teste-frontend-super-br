import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';


@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature('vinculacao-pessoa-usuario-list', reducers),
        EffectsModule.forFeature(effects),
        CommonModule
    ]
})
export class VinculacaoPessoaUsuarioStoreModule {
}
