import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';

import {reducers} from './reducers';

@NgModule({
    imports  : [
        StoreModule.forFeature('documento-avulso-edit-app', reducers)
    ],
    providers: []
})
export class DocumentoAvulsoEditStoreModule
{
}
