import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoGridsearchComponent} from './cdk-processo-gridsearch.component';
import {CdkProcessoGridModule} from '@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.module';

@NgModule({
    declarations: [
        CdkProcessoGridsearchComponent
    ],
    imports: [

        CdkProcessoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ProcessoService
    ],
    exports: [
        CdkProcessoGridsearchComponent
    ]
})
export class CdkProcessoGridsearchModule {
}
