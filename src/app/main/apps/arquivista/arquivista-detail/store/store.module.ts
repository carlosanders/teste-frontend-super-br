import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {effects} from './effects';
import {EffectsModule} from '@ngrx/effects';
import {StatusBarramentoService} from "../../../../../../@cdk/services/status-barramento";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('arquivista-detail-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        StatusBarramentoService
    ]
})
export class ArquivistaDetailStoreModule {
}
