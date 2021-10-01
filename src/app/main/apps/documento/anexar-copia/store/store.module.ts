import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';

import {reducers} from './reducers';
import {ProcessoService} from '@cdk/services/processo.service';

@NgModule({
    imports: [
        StoreModule.forFeature('anexar-copia-app', reducers)
    ],
    providers: [
        ProcessoService
    ]
})
export class AnexarCopiaStoreModule {
}
