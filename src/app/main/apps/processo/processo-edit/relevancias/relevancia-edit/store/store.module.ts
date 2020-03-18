import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import {reducers, RelevanciaEditState} from 'app/main/apps/processo/processo-edit/relevancias/relevancia-edit/store/reducers';
import { effects } from 'app/main/apps/processo/processo-edit/relevancias/relevancia-edit/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('relevancia-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class RelevanciaEditStoreModule
{
}
