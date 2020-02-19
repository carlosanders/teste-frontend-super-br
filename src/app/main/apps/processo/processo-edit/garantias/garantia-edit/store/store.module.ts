import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import {reducers, GarantiaEditState} from 'app/main/apps/processo/processo-edit/garantias/garantia-edit/store/reducers';
import { effects } from 'app/main/apps/processo/processo-edit/garantias/garantia-edit/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('garantia-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class GarantiaEditStoreModule
{
}
