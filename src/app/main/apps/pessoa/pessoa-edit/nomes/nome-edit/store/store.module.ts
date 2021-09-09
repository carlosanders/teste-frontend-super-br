import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/pessoa/pessoa-edit/nomes/nome-edit/store/reducers';
import {effects} from 'app/main/apps/pessoa/pessoa-edit/nomes/nome-edit/store/effects';

@NgModule({
    imports: [
        StoreModule.forFeature('nome-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class NomeEditStoreModule {
}
