import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {CdkModalidadeInteressadoGridsearchComponent} from './cdk-modalidade-interessado-gridsearch.component';
import {CdkModalidadeInteressadoGridModule} from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-grid/cdk-modalidade-interessado-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeInteressadoGridsearchComponent
    ],
    imports: [

        CdkModalidadeInteressadoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeInteressadoService
    ],
    exports: [
        CdkModalidadeInteressadoGridsearchComponent
    ]
})
export class CdkModalidadeInteressadoGridsearchModule {
}
