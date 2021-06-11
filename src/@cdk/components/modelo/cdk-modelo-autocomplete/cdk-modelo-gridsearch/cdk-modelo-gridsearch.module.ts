import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModeloService} from '@cdk/services/modelo.service';
import {CdkModeloGridsearchComponent} from './cdk-modelo-gridsearch.component';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';

@NgModule({
    declarations: [
        CdkModeloGridsearchComponent
    ],
    imports: [

        CdkModeloGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModeloService
    ],
    exports: [
        CdkModeloGridsearchComponent
    ]
})
export class CdkModeloGridsearchModule {
}
