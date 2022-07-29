import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-timeline/store/reducers';
import {effects} from 'app/main/apps/processo/processo-timeline/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('processo-timeline-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class ProcessoTimelineStoreModule
{
}
