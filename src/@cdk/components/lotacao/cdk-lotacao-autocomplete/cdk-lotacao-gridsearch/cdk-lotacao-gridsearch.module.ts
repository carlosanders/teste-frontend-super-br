import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {LotacaoService} from '@cdk/services/lotacao.service';
import {CdkLotacaoGridsearchComponent} from './cdk-lotacao-gridsearch.component';
import {CdkLotacaoGridModule} from '@cdk/components/lotacao/cdk-lotacao-grid/cdk-lotacao-grid.module';

@NgModule({
    declarations: [
        CdkLotacaoGridsearchComponent
    ],
    imports: [

        CdkLotacaoGridModule,

        CdkSharedModule,
        CdkLotacaoGridModule,
    ],
    providers: [
        LotacaoService
    ],
    exports: [
        CdkLotacaoGridsearchComponent
    ]
})
export class CdkLotacaoGridsearchModule {
}
