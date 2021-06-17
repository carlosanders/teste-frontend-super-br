import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AcaoService} from '@cdk/services/acao.service';
import {CdkAcaoGridsearchComponent} from './cdk-acao-gridsearch.component';
import {CdkAcaoGridModule} from '@cdk/components/acao/cdk-acao-grid/cdk-acao-grid.module';

@NgModule({
    declarations: [
        CdkAcaoGridsearchComponent
    ],
    imports: [

        CdkAcaoGridModule,

        CdkSharedModule,
    ],
    providers: [
        AcaoService
    ],
    exports: [
        CdkAcaoGridsearchComponent
    ]
})
export class CdkAcaoGridsearchModule {
}
