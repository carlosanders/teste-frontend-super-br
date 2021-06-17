import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';

import {AssinaturaService} from '@cdk/services/assinatura.service';

@NgModule({
    imports: [
        StoreModule.forFeature('responder-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        AssinaturaService
    ]
})
export class ResponderStoreModule {
}
