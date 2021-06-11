import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {CdkModalidadeColaboradorGridsearchComponent} from './cdk-modalidade-colaborador-gridsearch.component';
import {CdkModalidadeColaboradorGridModule} from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-grid/cdk-modalidade-colaborador-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeColaboradorGridsearchComponent
    ],
    imports: [

        CdkModalidadeColaboradorGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeColaboradorService
    ],
    exports: [
        CdkModalidadeColaboradorGridsearchComponent
    ]
})
export class CdkModalidadeColaboradorGridsearchModule {
}
