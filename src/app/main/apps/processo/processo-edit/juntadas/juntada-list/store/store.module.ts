import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/reducers';
import { effects } from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('juntada-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class JuntadaListStoreModule
{
}
