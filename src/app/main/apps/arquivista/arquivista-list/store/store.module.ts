import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../auth/login/login.service';
import {LembreteService} from '@cdk/services/lembrete.service';

@NgModule({
    imports: [
        StoreModule.forFeature('arquivista-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ProcessoService,
        LembreteService,
        LoginService
    ]
})
export class ArquivistaStoreModule {
}
