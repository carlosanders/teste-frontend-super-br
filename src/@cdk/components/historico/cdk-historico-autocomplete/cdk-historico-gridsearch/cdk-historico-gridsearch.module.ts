import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoGridsearchComponent} from './cdk-historico-gridsearch.component';
import {CdkHistoricoGridModule} from '@cdk/components/historico/cdk-historico-grid/cdk-historico-grid.module';

@NgModule({
    declarations: [
        CdkHistoricoGridsearchComponent
    ],
    imports: [

        CdkHistoricoGridModule,

        FuseSharedModule,
    ],
    providers: [
        HistoricoService
    ],
    exports: [
        CdkHistoricoGridsearchComponent
    ]
})
export class CdkHistoricoGridsearchModule {
}
