import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from 'app/main/apps/teste/store/reducers';
import { effects } from 'app/main/apps/teste/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('teste-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class TesteStoreModule
{
}
