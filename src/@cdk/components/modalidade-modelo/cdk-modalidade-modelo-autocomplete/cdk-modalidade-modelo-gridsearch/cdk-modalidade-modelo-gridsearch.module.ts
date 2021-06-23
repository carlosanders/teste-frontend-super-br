import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeModeloService} from '@cdk/services/modalidade-modelo.service';
import {CdkModalidadeModeloGridsearchComponent} from './cdk-modalidade-modelo-gridsearch.component';
import {CdkModalidadeModeloGridModule} from '@cdk/components/modalidade-modelo/cdk-modalidade-modelo-grid/cdk-modalidade-modelo-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeModeloGridsearchComponent
    ],
    imports: [

        CdkModalidadeModeloGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeModeloService
    ],
    exports: [
        CdkModalidadeModeloGridsearchComponent
    ]
})
export class CdkModalidadeModeloGridsearchModule {
}
