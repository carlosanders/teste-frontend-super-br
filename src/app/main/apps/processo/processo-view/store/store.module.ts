import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'app/main/apps/processo/processo-view/store/reducers';
import {effects} from 'app/main/apps/processo/processo-view/store/effects';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {DocumentoService} from '@cdk/services/documento.service';

@NgModule({
    imports  : [
        StoreModule.forFeature('processo-view-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        AssinaturaService,
        DocumentoService
    ]
})
export class ProcessoViewStoreModule
{
}
