import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {CdkDesentranhamentoGridsearchComponent} from './cdk-desentranhamento-gridsearch.component';
import {CdkDesentranhamentoGridModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-grid/cdk-desentranhamento-grid.module';

@NgModule({
    declarations: [
        CdkDesentranhamentoGridsearchComponent
    ],
    imports: [

        CdkDesentranhamentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        DesentranhamentoService
    ],
    exports: [
        CdkDesentranhamentoGridsearchComponent
    ]
})
export class CdkDesentranhamentoGridsearchModule {
}
