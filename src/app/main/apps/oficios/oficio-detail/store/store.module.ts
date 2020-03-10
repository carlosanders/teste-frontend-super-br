import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers, OficioDetailState } from 'app/main/apps/oficios/oficio-detail/store/reducers';
import { effects } from 'app/main/apps/oficios/oficio-detail/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('oficio-detail-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class OficioDetailStoreModule
{
}