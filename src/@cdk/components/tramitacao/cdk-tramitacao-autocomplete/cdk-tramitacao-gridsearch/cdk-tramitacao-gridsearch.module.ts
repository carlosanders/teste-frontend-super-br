import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkTramitacaoGridsearchComponent} from './cdk-tramitacao-gridsearch.component';
import {CdkTramitacaoGridModule} from '@cdk/components/tramitacao/cdk-tramitacao-grid/cdk-tramitacao-grid.module';

@NgModule({
    declarations: [
        CdkTramitacaoGridsearchComponent
    ],
    imports: [

        CdkTramitacaoGridModule,

        FuseSharedModule,
    ],
    providers: [
        TramitacaoService
    ],
    exports: [
        CdkTramitacaoGridsearchComponent
    ]
})
export class CdkTramitacaoGridsearchModule {
}
