import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {CdkAfastamentoGridsearchComponent} from './cdk-afastamento-gridsearch.component';
import {CdkAfastamentoGridModule} from '@cdk/components/afastamento/cdk-afastamento-grid/cdk-afastamento-grid.module';

@NgModule({
    declarations: [
        CdkAfastamentoGridsearchComponent
    ],
    imports: [

        CdkAfastamentoGridModule,

        FuseSharedModule,
    ],
    providers: [
        AfastamentoService
    ],
    exports: [
        CdkAfastamentoGridsearchComponent
    ]
})
export class CdkAfastamentoGridsearchModule {
}
