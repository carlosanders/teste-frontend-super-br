import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {CdkCompartilhamentoGridsearchComponent} from './cdk-compartilhamento-gridsearch.component';
import {CdkCompartilhamentoGridModule} from '@cdk/components/compartilhamento/cdk-compartilhamento-grid/cdk-compartilhamento-grid.module';

@NgModule({
    declarations: [
        CdkCompartilhamentoGridsearchComponent
    ],
    imports: [

        CdkCompartilhamentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        CompartilhamentoService
    ],
    exports: [
        CdkCompartilhamentoGridsearchComponent
    ]
})
export class CdkCompartilhamentoGridsearchModule {
}
