import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeCompartilhamentoService} from '@cdk/services/modalidade-compartilhamento.service';
import {CdkModalidadeCompartilhamentoGridsearchComponent} from './cdk-modalidade-compartilhamento-gridsearch.component';
import {CdkModalidadeCompartilhamentoGridModule} from '@cdk/components/modalidade-compartilhamento/cdk-modalidade-compartilhamento-grid/cdk-modalidade-compartilhamento-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeCompartilhamentoGridsearchComponent
    ],
    imports: [

        CdkModalidadeCompartilhamentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeCompartilhamentoService
    ],
    exports: [
        CdkModalidadeCompartilhamentoGridsearchComponent
    ]
})
export class CdkModalidadeCompartilhamentoGridsearchModule {
}
