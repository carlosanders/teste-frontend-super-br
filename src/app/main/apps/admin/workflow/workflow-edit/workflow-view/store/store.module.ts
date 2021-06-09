import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import {reducers, WorkflowViewState} from './reducers';
import { effects } from './effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('workflow-view-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class WorkflowViewStoreModule
{
}
