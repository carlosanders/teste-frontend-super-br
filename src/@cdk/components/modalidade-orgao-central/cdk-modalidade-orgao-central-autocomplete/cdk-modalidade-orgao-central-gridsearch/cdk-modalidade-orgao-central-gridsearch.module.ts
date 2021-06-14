import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {CdkModalidadeOrgaoCentralGridsearchComponent} from './cdk-modalidade-orgao-central-gridsearch.component';
import {CdkModalidadeOrgaoCentralGridModule} from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-grid/cdk-modalidade-orgao-central-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeOrgaoCentralGridsearchComponent
    ],
    imports: [

        CdkModalidadeOrgaoCentralGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeOrgaoCentralService
    ],
    exports: [
        CdkModalidadeOrgaoCentralGridsearchComponent
    ]
})
export class CdkModalidadeOrgaoCentralGridsearchModule {
}
