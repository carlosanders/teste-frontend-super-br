import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/volumes/volume-list/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/volumes/volume-list/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('volume-list-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class VolumeListStoreModule
{
}
