import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';

import {reducers} from './reducers';

@NgModule({
    imports  : [
        StoreModule.forFeature('numero-unico-documento-app', reducers)
    ],
    providers: []
})
export class NumeroUnicoDocumentoStoreModule
{
}
