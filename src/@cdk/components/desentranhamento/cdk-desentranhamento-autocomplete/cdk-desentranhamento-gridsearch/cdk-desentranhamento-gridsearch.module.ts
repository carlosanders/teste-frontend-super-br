import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {CdkDesentranhamentoGridsearchComponent} from './cdk-desentranhamento-gridsearch.component';
import {CdkDesentranhamentoGridModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-grid/cdk-desentranhamento-grid.module';

@NgModule({
    declarations: [
        CdkDesentranhamentoGridsearchComponent
    ],
    imports: [

        CdkDesentranhamentoGridModule,

        FuseSharedModule,
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
