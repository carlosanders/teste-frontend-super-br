import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/pessoa/pessoa-edit/nomes/nome-list/store/reducers';
import {effects} from 'app/main/apps/pessoa/pessoa-edit/nomes/nome-list/store/effects';

@NgModule({
    imports: [
        StoreModule.forFeature('nome-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class NomeListStoreModule {
}
