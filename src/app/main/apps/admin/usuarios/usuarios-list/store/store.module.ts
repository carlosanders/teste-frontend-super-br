import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';
import {
    TableDefinitionsService
} from '@cdk/components/table-definitions/table-definitions.service';

@NgModule({
    imports: [
        StoreModule.forFeature('coordenador-usuarios-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        TableDefinitionsService
    ]
})
export class UsuariosListStoreModule {
}
