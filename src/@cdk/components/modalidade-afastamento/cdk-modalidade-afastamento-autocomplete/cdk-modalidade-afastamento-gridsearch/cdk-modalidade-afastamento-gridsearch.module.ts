import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeAfastamentoService} from '@cdk/services/modalidade-afastamento.service';
import {CdkModalidadeAfastamentoGridsearchComponent} from './cdk-modalidade-afastamento-gridsearch.component';
import {CdkModalidadeAfastamentoGridModule} from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-grid/cdk-modalidade-afastamento-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeAfastamentoGridsearchComponent
    ],
    imports: [

        CdkModalidadeAfastamentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeAfastamentoService
    ],
    exports: [
        CdkModalidadeAfastamentoGridsearchComponent
    ]
})
export class CdkModalidadeAfastamentoGridsearchModule {
}
