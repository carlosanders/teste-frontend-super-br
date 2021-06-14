import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/sigilos/sigilo-edit/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/sigilos/sigilo-edit/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('sigilo-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class SigiloEditStoreModule
{
}
