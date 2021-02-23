import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {CdkAcompanhamentoGridsearchComponent} from './cdk-acompanhamento-gridsearch.component';
import {CdkAcompanhamentoGridModule} from '@cdk/components/acompanhamento/cdk-acompanhamento-grid/cdk-acompanhamento-grid.module';

@NgModule({
    declarations: [
        CdkAcompanhamentoGridsearchComponent
    ],
    imports: [

        CdkAcompanhamentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        AcompanhamentoService
    ],
    exports: [
        CdkAcompanhamentoGridsearchComponent
    ]
})
export class CdkAcompanhamentoGridsearchModule {
}
