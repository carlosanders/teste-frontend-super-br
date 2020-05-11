import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/volumes/volume-edit/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/volumes/volume-edit/store/effects';

@NgModule({
    imports: [
        StoreModule.forFeature('volume-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class VolumeEditStoreModule {
}
