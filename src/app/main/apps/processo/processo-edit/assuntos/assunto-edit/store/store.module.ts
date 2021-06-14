import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-edit/assuntos/assunto-edit/store/reducers';
import {effects} from 'app/main/apps/processo/processo-edit/assuntos/assunto-edit/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('assunto-edit-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class AssuntoEditStoreModule
{
}
