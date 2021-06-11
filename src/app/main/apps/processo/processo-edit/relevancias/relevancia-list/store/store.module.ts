import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/relevancias/relevancia-list/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/relevancias/relevancia-list/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('relevancia-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class RelevanciaListStoreModule
{
}
